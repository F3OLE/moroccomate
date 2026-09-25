import { NextResponse } from 'next/server';
import { PLACES, mapsUrl, normalizeCityKey, placeBestTime } from '@/data/places';
import {
  generateCuratedItinerary,
  type ItineraryInput,
} from '@/lib/curated-itinerary';
import { tripDayCount } from '@/lib/trip-days';

export const runtime = 'nodejs';
export const maxDuration = 45;

type GeminiActivity = {
  id?: string;
  title?: string;
  location?: string;
  duration?: string;
  cost?: string;
  description?: string;
  timeSlot?: string;
  type?: string;
  tips?: string;
  category?: string;
  mapsUrl?: string;
  clock?: string;
  bestTime?: string;
  badge?: string;
};

type GeminiDay = {
  day?: number;
  date?: string;
  activities?: GeminiActivity[];
};

type GeminiItinerary = {
  city?: string;
  startDate?: string;
  endDate?: string;
  groupSize?: number | string;
  interests?: string[];
  budget?: string;
  specialRequests?: string;
  days?: number;
  totalEstimatedCost?: string;
  generalTips?: string[];
  itinerary?: GeminiDay[];
};

const TIME_SLOTS = new Set([
  'morning',
  'afternoon',
  'evening',
  'lunch',
  'dinner',
]);
const ACTIVITY_TYPES = new Set(['activity', 'meal', 'transport']);

export async function POST(request: Request) {
  let body: ItineraryInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body?.city || !body?.startDate || !body?.endDate) {
    return NextResponse.json(
      { error: 'city, startDate, and endDate are required' },
      { status: 400 }
    );
  }

  const input: ItineraryInput = {
    city: String(body.city),
    startDate: String(body.startDate),
    endDate: String(body.endDate),
    groupSize: Number(body.groupSize) || 2,
    interests: Array.isArray(body.interests) ? body.interests.map(String) : [],
    budget: Number(body.budget) || 90,
    specialRequests: body.specialRequests
      ? String(body.specialRequests)
      : undefined,
  };

  const start = new Date(input.startDate + 'T12:00:00');
  const end = new Date(input.endDate + 'T12:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxAhead = new Date(today);
  maxAhead.setMonth(maxAhead.getMonth() + 12);
  const daySpan = tripDayCount(input.startDate, input.endDate);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end < start ||
    start < today ||
    start > maxAhead ||
    end > maxAhead ||
    daySpan > 21
  ) {
    return NextResponse.json(
      {
        error:
          'Dates must be from today within 12 months, and trips max 3 weeks.',
      },
      { status: 400 }
    );
  }

  try {
    const gemini = await generateWithGemini(input);
    if (gemini) {
      return NextResponse.json(gemini);
    }
  } catch (err) {
    console.error('[itinerary/generate] Gemini failed:', err);
  }

  // Instant curated plan when Gemini is slow/unavailable (503, timeout, missing key, etc.)
  const fallback = generateCuratedItinerary(input);
  return NextResponse.json({ ...fallback, source: 'curated' as const });
}

async function generateWithGemini(input: ItineraryInput) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'your_gemini_api_key') {
    console.warn(
      '[itinerary/generate] GEMINI_API_KEY missing — using curated places'
    );
    return null;
  }

  const dayCount = tripDayCount(input.startDate, input.endDate);

  const budgetLabel =
    input.budget <= 60 * dayCount
      ? 'budget'
      : input.budget <= 120 * dayCount
        ? 'mid-range'
        : 'luxury';

  const cityKey = normalizeCityKey(input.city);

  const placeHints = PLACES.filter((p) => p.city === cityKey)
    .map((p) => `${p.name} (${p.category}, ${p.neighborhood})`)
    .join('; ');

  const prompt = `You are MoroccoMate, an expert Morocco trip planner for Marrakech, Casablanca, Rabat, and Tangier.

Create a realistic day-by-day itinerary as JSON only (no markdown).

Trip:
- city: ${input.city}
- startDate: ${input.startDate}
- endDate: ${input.endDate}
- days: ${dayCount}
- groupSize: ${input.groupSize}
- interests: ${input.interests.join(', ') || 'general sightseeing'}
- budget level: ${budgetLabel} (total trip budget roughly $${input.budget})
- specialRequests: ${input.specialRequests || 'none'}

Prefer these real places (many are popular on Instagram/TikTok) when relevant: ${placeHints}

Return exactly this JSON shape:
{
  "city": string,
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "groupSize": number,
  "interests": string[],
  "budget": "budget" | "mid-range" | "luxury",
  "specialRequests": string,
  "days": number,
  "totalEstimatedCost": string like "$270",
  "generalTips": string[3-5],
  "itinerary": [
    {
      "day": number,
      "date": "YYYY-MM-DD",
      "activities": [
        {
          "id": string,
          "title": string (real venue or experience name),
          "location": string (neighborhood/area),
          "duration": string,
          "cost": string,
          "description": string,
          "timeSlot": "morning" | "afternoon" | "evening" | "lunch" | "dinner",
          "type": "activity" | "meal" | "transport",
          "tips": string,
          "category": string,
          "clock": string like "09:30",
          "bestTime": string like "Sunset · 18:30-19:30",
          "badge": "partner" | "verified" | omit
        }
      ]
    }
  ]
}

Rules:
- Exactly ${dayCount} days, dates sequential from startDate.
- Each day: 3-5 activities covering morning, a meal, afternoon, evening when possible.
- NEVER repeat the same place twice in one day. Prefer unique places across the whole trip.
- Match timeSlot to the venue (no nightlife/marina-night spots in the morning).
- Include bestTime for every stop (sunset, morning cool hours, late night, etc.).
- Use real Marrakech/Casablanca/Rabat/Tangier venues (social-famous cafés, rooftops, corniche spots), not generic filler.
- Match the traveler interests and budget.
- Keep descriptions concise (1-2 sentences).
- Never use em dashes or long dashes in any text. Use commas or periods instead.`;

  const requestBody = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      responseMimeType: 'application/json',
      maxOutputTokens: 8192,
    },
  });

  // Try current flash first, then a stable alias if the model id moved.
  const models = [
    'gemini-2.0-flash',
    'gemini-2.0-flash-001',
    'gemini-flash-latest',
  ];

  let res: Response | null = null;
  let lastErr = '';
  for (const model of models) {
    const modelUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    try {
      res = await fetchGeminiWithRetry(modelUrl, apiKey, requestBody, 2);
      if (res.ok) break;
      lastErr = await res.text().catch(() => '');
      // Model not found / not supported for this key — try next id.
      if (res.status === 404 || res.status === 400) continue;
      throw new Error(`Gemini HTTP ${res.status}: ${lastErr.slice(0, 300)}`);
    } catch (err) {
      lastErr = err instanceof Error ? err.message : String(err);
      if (model === models[models.length - 1]) throw err;
    }
  }

  if (!res || !res.ok) {
    throw new Error(
      `Gemini unavailable: ${lastErr.slice(0, 300) || 'no response'}`
    );
  }

  const payload = await res.json();
  const text =
    payload?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text || '')
      .join('') || '';

  if (!text.trim()) throw new Error('Empty Gemini response');

  const parsed = JSON.parse(stripFence(text)) as GeminiItinerary;
  return normalizeItinerary(parsed, input, dayCount, budgetLabel);
}

async function fetchGeminiWithRetry(
  url: string,
  apiKey: string,
  body: string,
  attempts: number
) {
  let last: Response | null = null;

  for (let i = 0; i < attempts; i++) {
    const controller = new AbortController();
    // Cap wait so the plan page never hangs on a slow/overloaded model.
    const timer = setTimeout(() => controller.abort(), 18_000);

    try {
      last = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
        body,
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timer);
      if (i === attempts - 1) throw err;
      await sleep(800 * (i + 1));
      continue;
    } finally {
      clearTimeout(timer);
    }

    // Retry transient overload / rate limits once.
    if ((last.status === 503 || last.status === 429) && i < attempts - 1) {
      await sleep(900 * (i + 1));
      continue;
    }

    return last;
  }

  return last!;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripFence(text: string) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```$/i);
  return fenced ? fenced[1].trim() : trimmed;
}

function normalizeItinerary(
  raw: GeminiItinerary,
  input: ItineraryInput,
  dayCount: number,
  budgetLabel: string
) {
  if (!Array.isArray(raw.itinerary) || raw.itinerary.length === 0) {
    throw new Error('Gemini JSON missing itinerary days');
  }

  const itinerary = raw.itinerary.slice(0, dayCount).map((day, index) => {
    const date =
      day.date ||
      new Date(
        new Date(input.startDate).getTime() + index * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0];

    const activities = (day.activities || [])
      .filter((a) => a?.title)
      .map((a, i) => {
        const timeSlot = TIME_SLOTS.has(String(a.timeSlot))
          ? String(a.timeSlot)
          : 'morning';
        const type = ACTIVITY_TYPES.has(String(a.type))
          ? String(a.type)
          : 'activity';
        const title = String(a.title);
        const location = String(a.location || input.city);
        const known = PLACES.find(
          (p) => p.name.toLowerCase() === title.toLowerCase()
        );
        const badgeRaw = a.badge || known?.badge;
        const badge =
          badgeRaw === 'partner' || badgeRaw === 'verified'
            ? badgeRaw
            : undefined;

        return {
          id: String(a.id || `gemini_${index}_${i}_${Date.now()}`),
          title,
          location,
          duration: String(a.duration || '2 hours'),
          cost: String(a.cost || '~$20'),
          description: String(a.description || ''),
          timeSlot,
          type,
          tips: a.tips ? String(a.tips) : undefined,
          category: a.category
            ? String(a.category)
            : known?.category,
          mapsUrl:
            a.mapsUrl ||
            (known
              ? mapsUrl(known.mapsQuery)
              : mapsUrl(`${title} ${location} ${input.city}`)),
          clock: a.clock ? String(a.clock) : undefined,
          bestTime: a.bestTime
            ? String(a.bestTime)
            : known
              ? placeBestTime(known)
              : undefined,
          badge,
          placeId: known?.id,
          whatsapp: known?.whatsapp,
        };
      });

    // Drop same-day duplicate titles
    const seen = new Set<string>();
    const uniqueActivities = activities.filter((a) => {
      const key = a.title.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (uniqueActivities.length === 0) {
      throw new Error(`Day ${index + 1} has no activities`);
    }

    return {
      day: Number(day.day) || index + 1,
      date,
      activities: uniqueActivities,
    };
  });

  return {
    city: String(raw.city || input.city),
    startDate: String(raw.startDate || input.startDate),
    endDate: String(raw.endDate || input.endDate),
    groupSize: Number(raw.groupSize) || input.groupSize,
    interests: Array.isArray(raw.interests)
      ? raw.interests.map(String)
      : input.interests,
    budget: String(raw.budget || budgetLabel),
    specialRequests: raw.specialRequests
      ? String(raw.specialRequests)
      : input.specialRequests,
    days: itinerary.length,
    totalEstimatedCost: String(
      raw.totalEstimatedCost || `$${Math.round(input.budget)}`
    ),
    generalTips: Array.isArray(raw.generalTips)
      ? raw.generalTips.map(String).slice(0, 6)
      : [
          'Open stops in Google Maps for live hours and directions.',
          'Book popular restaurants and clubs ahead on weekends.',
        ],
    itinerary,
    source: 'gemini' as const,
  };
}
