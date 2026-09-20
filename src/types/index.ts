export interface Activity {
  id: string;
  title: string;
  location: string;
  duration: string;
  cost: string;
  description: string;
  timeSlot: 'morning' | 'afternoon' | 'evening' | 'lunch' | 'dinner';
  type: 'activity' | 'meal' | 'transport';
  tips?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  category?: string;
  mapsUrl?: string;
  clock?: string;
  bestTime?: string;
  badge?: 'partner' | 'verified';
  placeId?: string;
  whatsapp?: string;
}

export interface Day {
  day: number;
  date: string;
  activities: Activity[];
  summary?: {
    totalActivities: number;
    totalMeals: number;
    totalDuration: number;
    totalCost: number;
  };
}

export interface Itinerary {
  _id?: string;
  city: string;
  startDate: string;
  endDate: string;
  groupSize: string | number;
  interests: string[];
  budget: string;
  specialRequests?: string;
  days?: number;
  totalEstimatedCost?: string;
  generalTips?: string[];
  itinerary: Day[];
}

export interface TripFormData {
  city: 'marrakesh' | 'casablanca' | 'rabat' | 'tangier';
  startDate: string;
  endDate: string;
  groupSize: 'solo' | 'couple' | 'family' | 'friends';
  interests: string[];
  budget: 'budget' | 'mid-range' | 'luxury';
  specialRequests?: string;
}

export interface FeedbackData {
  activityId: string;
  rating: 'loved' | 'neutral' | 'disliked';
  comment?: string;
}

