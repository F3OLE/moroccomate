import {
  EXPERIENCES,
  mapsUrl,
  normalizeCityKey,
  pickPlaces,
  type Place,
} from '@/data/places';

export type ItineraryInput = {
  city: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  interests: string[];
  budget: number;
  specialRequests?: string;
};

export function generateCuratedItinerary(data: ItineraryInput) {
  const dayCount = Math.max(
    1,
    Math.ceil(
      (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 1
  );

  const budgetKey =
    data.budget <= 60 * dayCount
      ? 'budget'
      : data.budget <= 120 * dayCount
        ? 'mid-range'
        : 'luxury';

  const dailyBudget =
    budgetKey === 'budget' ? 50 : budgetKey === 'mid-range' ? 90 : 150;

  const interests = data.interests?.length
    ? data.interests
    : ['food', 'history', 'shopping'];

  const curated = pickPlaces(data.city, interests, Math.max(8, dayCount * 4));
  const cityKey = normalizeCityKey(data.city);
  const cityHint =
    cityKey === 'marrakesh'
      ? 'marrakech'
      : cityKey === 'casablanca'
        ? 'casa'
        : cityKey;

  const experiences = EXPERIENCES.filter(
    (e) =>
      e.city.toLowerCase().includes(cityHint) ||
      e.category === 'desert' ||
      e.category === 'adventure'
  );

  const dayArray = Array.from({ length: dayCount }, (_, index) => {
    const base = index * 3;
    const morning = curated[(base + 0) % curated.length];
    const lunch = pickMeal(curated, base + 1);
    const afternoon = curated[(base + 2) % curated.length] || morning;
    const evening = pickEvening(curated, interests, base + 3);
    const adventure =
      interests.includes('adventure') && experiences[index % experiences.length]
        ? experiences[index % experiences.length]
        : null;

    const activities = [
      placeToActivity(morning, 'morning', '09:30', dailyBudget),
      placeToActivity(lunch, 'lunch', '12:30', dailyBudget),
      adventure && index % 2 === 0
        ? {
            id: `exp_${index}_${adventure.id}`,
            title: adventure.title,
            location: adventure.location,
            duration: adventure.duration,
            cost: adventure.price,
            description: adventure.description,
            timeSlot: 'afternoon' as const,
            type: 'activity' as const,
            tips: 'Book through MoroccoMate partners — spots fill up on weekends.',
            category: adventure.category,
            mapsUrl: mapsUrl(`${adventure.title} ${adventure.location}`),
          }
        : placeToActivity(afternoon, 'afternoon', '15:00', dailyBudget),
      placeToActivity(evening, 'evening', '20:00', dailyBudget),
    ];

    return {
      day: index + 1,
      date: new Date(
        new Date(data.startDate).getTime() + index * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0],
      activities,
    };
  });

  return {
    city: data.city,
    startDate: data.startDate,
    endDate: data.endDate,
    groupSize: data.groupSize,
    interests,
    budget: budgetKey,
    specialRequests: data.specialRequests,
    days: dayCount,
    totalEstimatedCost: `$${dailyBudget * dayCount}`,
    generalTips: [
      'Open any stop in Google Maps from the itinerary for directions & hours.',
      'Book clubs and popular restaurants ahead on weekends.',
      'Carry small cash for souks; cards work at malls and many restaurants.',
      'Dress smart for rooftop clubs and Corniche nights.',
    ],
    itinerary: dayArray,
    source: 'curated' as const,
  };
}

function pickMeal(pool: Place[], seed: number): Place {
  const meals = pool.filter(
    (p) => p.category === 'restaurants' || p.category === 'cafes'
  );
  if (meals.length) return meals[seed % meals.length];
  return pool[seed % pool.length];
}

function pickEvening(pool: Place[], interests: string[], seed: number): Place {
  if (interests.includes('nightlife')) {
    const clubs = pool.filter((p) => p.category === 'nightlife');
    if (clubs.length) return clubs[seed % clubs.length];
  }
  const dinners = pool.filter((p) => p.category === 'restaurants');
  if (dinners.length) return dinners[seed % dinners.length];
  return pool[seed % pool.length];
}

function placeToActivity(
  place: Place,
  timeSlot: 'morning' | 'afternoon' | 'evening' | 'lunch' | 'dinner',
  clock: string,
  dailyBudget: number
) {
  const type =
    place.category === 'restaurants' || place.category === 'cafes'
      ? ('meal' as const)
      : ('activity' as const);

  const costShare =
    place.priceRange.length >= 3
      ? Math.floor(dailyBudget / 2.5)
      : place.priceRange.length === 2
        ? Math.floor(dailyBudget / 4)
        : Math.floor(dailyBudget / 6);

  return {
    id: `act_${place.id}_${timeSlot}_${Date.now()}`,
    title: place.name,
    location: `${place.neighborhood}`,
    duration:
      timeSlot === 'lunch' || timeSlot === 'dinner' ? '1.5 hours' : '2–3 hours',
    cost: `~$${costShare}`,
    description: place.description,
    timeSlot,
    type,
    tips: `★ ${place.rating} · ${place.priceRange} · ${place.tags.join(', ')}`,
    category: place.category,
    mapsUrl: mapsUrl(place.mapsQuery),
    clock,
  };
}
