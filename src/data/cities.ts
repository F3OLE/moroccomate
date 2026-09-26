import {
  EXPERIENCES,
  PLACES,
  type Place,
  type PlaceCity,
  type Experience,
} from '@/data/places';
import { BLOG_POSTS, type BlogPost } from '@/data/blog';

export type CityHub = {
  slug: string;
  placeCity: PlaceCity;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  /** Short "known for" tags shown on the expanded homepage card. */
  highlights: string[];
  keywords: string[];
};

export const CITY_HUBS: CityHub[] = [
  {
    slug: 'marrakech',
    placeCity: 'marrakesh',
    name: 'Marrakech',
    tagline: 'Medina nights, rooftops, and day trips',
    description:
      'Plan Marrakech with real restaurants, nightlife, souks, hammams, and Agafay adventures. Open spots in Maps or build a day-by-day itinerary.',
    heroImage: '/images/places/jemaa-sunset.jpg',
    highlights: ['Medina & souks', 'Nightlife', 'Rooftop dining'],
    keywords: [
      'Marrakech guide',
      'things to do in Marrakech',
      'Marrakech restaurants',
      'Marrakech nightlife',
      'Marrakech itinerary',
      'Agafay desert',
    ],
  },
  {
    slug: 'casablanca',
    placeCity: 'casablanca',
    name: 'Casablanca',
    tagline: 'Atlantic city energy and late dinners',
    description:
      'Discover Casablanca restaurants, Corniche nights, cafés, and landmarks. Build a realistic city itinerary with MoroccoMate.',
    heroImage: '/images/places/casablanca-skyline.jpg',
    highlights: ['Modern city', 'Art Deco', 'Seafood'],
    keywords: [
      'Casablanca guide',
      'things to do in Casablanca',
      'Casablanca restaurants',
      'Casablanca nightlife',
      'Casablanca itinerary',
    ],
  },
  {
    slug: 'rabat',
    placeCity: 'rabat',
    name: 'Rabat',
    tagline: 'Capital calm, kasbah views, and good food',
    description:
      'Explore Rabat restaurants, cafés, Chellah, and the Kasbah des Oudayas. Plan a quieter Morocco base with real mapped spots.',
    heroImage: '/images/places/rabat-oudayas.jpg',
    highlights: ['Kasbah', 'Museums', 'Quiet charm'],
    keywords: [
      'Rabat guide',
      'things to do in Rabat',
      'Rabat restaurants',
      'Rabat itinerary',
      'Kasbah des Oudayas',
    ],
  },
  {
    slug: 'tangier',
    placeCity: 'tangier',
    name: 'Tangier',
    tagline: 'Where the Mediterranean meets the Atlantic',
    description:
      'Browse Tangier cafés, kasbah walks, beach time, and restaurants. Plan a north Morocco stop with Maps links and local picks.',
    heroImage: '/images/places/tangier-medina.jpg',
    highlights: ['Mediterranean', 'Cafes', 'Street art'],
    keywords: [
      'Tangier guide',
      'things to do in Tangier',
      'Tangier restaurants',
      'Tangier itinerary',
      'Tangier kasbah',
    ],
  },
];

export function getCityHub(slug: string): CityHub | undefined {
  return CITY_HUBS.find((c) => c.slug === slug);
}

export function getAllCitySlugs() {
  return CITY_HUBS.map((c) => c.slug);
}

export function placesForHub(hub: CityHub, limit = 6): Place[] {
  return PLACES.filter((p) => p.city === hub.placeCity)
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function experiencesForHub(hub: CityHub, limit = 3): Experience[] {
  const key = hub.placeCity;
  return EXPERIENCES.filter((xp) => {
    const c = xp.city.toLowerCase();
    if (key === 'marrakesh') return c.includes('marr');
    if (key === 'casablanca') return c.includes('casa');
    if (key === 'rabat') return c.includes('rabat');
    if (key === 'tangier') return c.includes('tang');
    return false;
  }).slice(0, limit);
}

export function blogForHub(hub: CityHub, limit = 2): BlogPost[] {
  const name = hub.name.toLowerCase();
  const matched = BLOG_POSTS.filter((p) => {
    const city = (p.city || '').toLowerCase();
    const tags = p.tags.join(' ').toLowerCase();
    const title = p.title.toLowerCase();
    return (
      city.includes(name) ||
      tags.includes(name) ||
      title.includes(name) ||
      (hub.slug === 'marrakech' &&
        (tags.includes('marrakech') || tags.includes('marrakesh')))
    );
  });
  if (matched.length >= limit) return matched.slice(0, limit);
  const fallback = BLOG_POSTS.filter((p) => !matched.includes(p));
  return [...matched, ...fallback].slice(0, limit);
}
