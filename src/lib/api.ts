import {
  generateCuratedItinerary,
  type ItineraryInput,
} from '@/lib/curated-itinerary';

export async function generateItinerary(
  data: ItineraryInput & { userId?: string }
): Promise<any> {
  try {
    const response = await fetch('/api/itinerary/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to generate itinerary');
    return await response.json();
  } catch (error) {
    console.error('API Error — using curated places fallback:', error);
    return generateCuratedItinerary(data);
  }
}

export async function submitFeedback(data: {
  userId: string;
  itineraryId: string;
  tripDetails: any;
  overallRating: number;
  overallComment: string;
  activityFeedback: any[];
}): Promise<any> {
  try {
    const response = await fetch('/api/feedback/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to submit feedback');
    return await response.json();
  } catch (error) {
    console.error('Feedback submission error:', error);
    throw error;
  }
}

export async function submitLead(
  type: 'early-access' | 'partner',
  payload: Record<string, string>
) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type,
      ...payload,
      createdAt: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Submission failed');
  }
  return response.json();
}
