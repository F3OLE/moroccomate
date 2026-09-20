import {
  EXPERIENCES,
  clockForSlot,
  mapsUrl,
  normalizeCityKey,
  pickPlaces,
  placeBestTime,
  placePreferredSlot,
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

type Slot = 'morning' | 'afternoon' | 'evening' | 'lunch' | 'dinner';

class PlacePicker {
  private usedGlobal = new Map<string, number>();
  private usedToday = new Set<string>();

  startDay() {
    this.usedToday.clear();
  }

  take(candidates: Place[], dayIndex: number, fallback: Place[] = []): Place | null {
    const tryList = [...candidates, ...fallback];
    const ranked = tryList
      .filter((p) => !this.usedToday.has(p.id))
      .sort((a, b) => {
        const la = this.usedGlobal.get(a.id) ?? -99;
        const lb = this.usedGlobal.get(b.id) ?? -99;
        return la - lb;
      });

    for (const p of ranked) {
      const last = this.usedGlobal.get(p.id);
      if (last === undefined || dayIndex - last >= 2 || ranked.length <= 3) {
        this.usedToday.add(p.id);
        this.usedGlobal.set(p.id, dayIndex);
        return p;
      }
    }
    const any = ranked[0];
    if (any) {
      this.usedToday.add(any.id);
      this.usedGlobal.set(any.id, dayIndex);
      return any;
    }
    return null;
  }
}

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

  const pool = pickPlaces(data.city, interests, Math.max(12, dayCount * 4));
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

  const picker = new PlacePicker();
  const meals = pool.filter(
    (p) => p.category === 'restaurants' || p.category === 'cafes'
  );
  // Never schedule nightlife / evening-only spots in the morning
  const mornings = pool.filter(
    (p) =>
      p.category !== 'nightlife' &&
      placePreferredSlot(p) !== 'evening' &&
      (p.category === 'monuments' ||
        p.category === 'shopping' ||
        p.category === 'cafes' ||
        p.category === 'experiences' ||
        placePreferredSlot(p) === 'morning')
  );
  const afternoons = pool.filter(
    (p) =>
      p.category !== 'nightlife' &&
      (p.category === 'experiences' ||
        p.category === 'shopping' ||
        p.category === 'monuments' ||
        p.tags.includes('pool') ||
        placePreferredSlot(p) === 'afternoon')
  );
  const evenings = pool.filter(
    (p) =>
      p.category === 'nightlife' ||
      placePreferredSlot(p) === 'evening' ||
      p.category === 'restaurants'
  );

  const dayArray = Array.from({ length: dayCount }, (_, index) => {
    picker.startDay();

    const morning =
      picker.take(mornings.length ? mornings : pool, index, pool) || pool[0];
    const lunch = picker.take(meals.length ? meals : pool, index, pool) || pool[0];

    const useAdventure =
      interests.includes('adventure') &&
      experiences.length > 0 &&
      index % 2 === 0;

    const afternoonPlace = useAdventure
      ? null
      : picker.take(afternoons.length ? afternoons : pool, index, pool);

    const evening =
      picker.take(evenings.length ? evenings : pool, index, pool) || pool[0];

    const activities = [];

    activities.push(placeToActivity(morning, 'morning', dailyBudget));
    activities.push(placeToActivity(lunch, 'lunch', dailyBudget));

    if (useAdventure) {
      const exp = experiences[index % experiences.length];
      activities.push({
        id: `exp_${index}_${exp.id}`,
        title: exp.title,
        location: exp.location,
        duration: exp.duration,
        cost: exp.price,
        description: exp.description,
        timeSlot: 'afternoon' as const,
        type: 'activity' as const,
        tips: 'Book through MoroccoMate partners. Spots fill up on weekends.',
        bestTime: 'Afternoon · book morning slots in summer heat',
        category: exp.category,
        mapsUrl: mapsUrl(`${exp.title} ${exp.location}`),
        clock: '15:00',
        badge: 'partner' as const,
      });
    } else if (afternoonPlace) {
      activities.push(placeToActivity(afternoonPlace, 'afternoon', dailyBudget));
    }

    activities.push(placeToActivity(evening, 'evening', dailyBudget));

    const seen = new Set<string>();
    const uniqueActivities = activities.filter((a) => {
      const key = a.title.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return {
      day: index + 1,
      date: new Date(
        new Date(data.startDate).getTime() + index * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0],
      activities: uniqueActivities,
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

function placeToActivity(place: Place, slot: Slot, dailyBudget: number) {
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
    id: `act_${place.id}_${slot}`,
    title: place.name,
    location: place.neighborhood,
    duration: slot === 'lunch' || slot === 'dinner' ? '1.5 hours' : '2-3 hours',
    cost: `~$${costShare}`,
    description: place.description,
    timeSlot: slot,
    type,
    tips: `★ ${place.rating} · ${place.priceRange} · ${place.tags.join(', ')}`,
    bestTime: placeBestTime(place),
    category: place.category,
    mapsUrl: mapsUrl(place.mapsQuery),
    clock: clockForSlot(slot),
    badge: place.badge,
    placeId: place.id,
    whatsapp: place.whatsapp,
  };
}
