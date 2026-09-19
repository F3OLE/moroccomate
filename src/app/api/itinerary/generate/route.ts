import { NextResponse } from 'next/server';
import { PLACES, mapsUrl } from '@/data/places';
import {
  generateCuratedItinerary,
  type ItineraryInput,
} from '@/lib/curated-itinerary';

export const runtime = 'nodejs';
export const maxDuration = 60;

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

  try {
    const gemini = await generateWithGemini(input);
    if (gemini) {
      return NextResponse.json(gemini);
    }
  } catch (err) {
    console.error('[itinerary/generate] Gemini failed:', err);
  }

  const fallback = generateCuratedItinerary(input);
  return NextResponse.json(fallback);
}

async function generateWithGemini(input: ItineraryInput) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[itinerary/generate] GEMINI_API_KEY missing');
    return null;
  }

  const dayCount = Math.max(
    1,
    Math.ceil(
      (new Date(input.endDate).getTime() - new Date(input.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 1
  );

  const budgetLabel =
    input.budget <= 60 * dayCount
      ? 'budget'
      : input.budget <= 120 * dayCount
        ? 'mid-range'
        : 'luxury';

  const cityKey = input.city.toLowerCase().includes('casa')
    ? 'casablanca'
    : 'marrakesh';

  const placeHints = PLACES.filter((p) => p.city === cityKey)
    .map((p) => `${p.name} (${p.category}, ${p.neighborhood})`)
    .join('; ');

  const prompt = `You are MoroccoMate, an expert Morocco trip planner for Marrakech and Casablanca.

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

Prefer these real places when relevant: ${placeHints}

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
          "clock": string like "09:30"
        }
      ]
    }
  ]
}

Rules:
- Exactly ${dayCount} days, dates sequential from startDate.
- Each day: 3–5 activities covering morning, a meal, afternoon, evening when possible.
- Use real Marrakech/Casablanca venues, not generic filler.
- Match the traveler interests and budget.
- Keep descriptions concise (1–2 sentences).`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Gemini HTTP ${res.status}: ${errText.slice(0, 300)}`);
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
          category: a.category ? String(a.category) : undefined,
          mapsUrl:
            a.mapsUrl ||
            mapsUrl(`${title} ${location} ${input.city}`),
          clock: a.clock ? String(a.clock) : undefined,
        };
      });

    if (activities.length === 0) {
      throw new Error(`Day ${index + 1} has no activities`);
    }

    return {
      day: Number(day.day) || index + 1,
      date,
      activities,
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
