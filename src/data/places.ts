export type PlaceCategory =
  | 'restaurants'
  | 'nightlife'
  | 'shopping'
  | 'monuments'
  | 'experiences'
  | 'cafes';

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  city: 'marrakesh' | 'casablanca' | 'nationwide';
  neighborhood: string;
  description: string;
  image: string;
  rating: number;
  priceRange: string;
  tags: string[];
  mapsQuery: string;
  bestFor: string[];
}

export interface Experience {
  id: string;
  title: string;
  location: string;
  city: string;
  image: string;
  price: string;
  duration: string;
  description: string;
  category: 'adventure' | 'sky' | 'desert' | 'culture' | 'nightlife';
  included: string[];
  partnerType: string;
}

/** Local Wikimedia photos matched to the actual venues / landmarks. */
const placeImg = (file: string) => `/images/places/${file}`;

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;

export const PLACES: Place[] = [
  {
    id: 'nomad-marrakech',
    name: 'Nomad',
    category: 'restaurants',
    city: 'marrakesh',
    neighborhood: 'Medina · Rooftop',
    description: 'Modern Moroccan plates with one of the best Medina rooftop views — mint lemonade, lamb shoulder, and sunset crowds.',
    image: placeImg('jemaa-sunset.jpg'), // Medina / Jemaa el-Fnaa sunset rooftop view
    rating: 4.6,
    priceRange: '$$$',
    tags: ['rooftop', 'dinner', 'instagram'],
    mapsQuery: 'Nomad Restaurant Marrakech',
    bestFor: ['food', 'nightlife'],
  },
  {
    id: 'le-jardin-marrakech',
    name: 'Le Jardin',
    category: 'restaurants',
    city: 'marrakesh',
    neighborhood: 'Souk El Jeld',
    description: 'Hidden courtyard restaurant under banana trees — great for lunch after souk shopping.',
    image: placeImg('le-jardin.jpg'), // Marrakech riad / garden courtyard
    rating: 4.5,
    priceRange: '$$',
    tags: ['garden', 'lunch', 'calm'],
    mapsQuery: 'Le Jardin Restaurant Marrakech',
    bestFor: ['food'],
  },
  {
    id: 'cafe-des-epices',
    name: 'Café des Épices',
    category: 'cafes',
    city: 'marrakesh',
    neighborhood: 'Rahba Kedima',
    description: 'Classic spice-square café for people-watching, fresh juices, and light Moroccan bites.',
    image: placeImg('cafe-des-epices.jpg'), // Café des Épices, Marrakech
    rating: 4.4,
    priceRange: '$',
    tags: ['cafe', 'juice', 'viewpoint'],
    mapsQuery: 'Cafe des Epices Marrakech',
    bestFor: ['food'],
  },
  {
    id: 'comptoir-darna',
    name: 'Comptoir Darna',
    category: 'nightlife',
    city: 'marrakesh',
    neighborhood: 'Hivernage',
    description: 'Dinner-show venue with belly dance, DJ energy, and a late-night crowd — classic Marrakech night out.',
    image: placeImg('sofitel-marrakech.jpg'), // Hivernage / Sofitel nightlife district
    rating: 4.3,
    priceRange: '$$$',
    tags: ['club', 'show', 'late-night'],
    mapsQuery: 'Comptoir Darna Marrakech',
    bestFor: ['nightlife'],
  },
  {
    id: 'theatro-club',
    name: 'Theatro Club',
    category: 'nightlife',
    city: 'marrakesh',
    neighborhood: 'Hotel Sofitel · Hivernage',
    description: 'One of Marrakech’s main party spots — international DJs, bottle service, and a dressy scene.',
    image: placeImg('sofitel-marrakech.jpg'), // Sofitel Marrakech (Theatro is inside)
    rating: 4.2,
    priceRange: '$$$$',
    tags: ['club', 'DJ', 'party'],
    mapsQuery: 'Theatro Club Sofitel Marrakech',
    bestFor: ['nightlife'],
  },
  {
    id: 'souk-semmarine',
    name: 'Souk Semmarine',
    category: 'shopping',
    city: 'marrakesh',
    neighborhood: 'Medina Souks',
    description: 'Main covered souk lane for leather, lanterns, carpets, and spices — bargain hard, stay polite.',
    image: placeImg('souk-semmarine.jpg'), // Covered Souk Semmarine
    rating: 4.7,
    priceRange: '$$',
    tags: ['souk', 'souvenirs', 'crafts'],
    mapsQuery: 'Souk Semmarine Marrakech',
    bestFor: ['shopping', 'arts'],
  },
  {
    id: 'ensemble-artisanale',
    name: 'Ensemble Artisanal',
    category: 'shopping',
    city: 'marrakesh',
    neighborhood: 'Near Bab Doukkala',
    description: 'Fixed-price artisan co-op for quality leather, ceramics, and textiles without aggressive haggling.',
    image: placeImg('ensemble-artisanal.jpg'), // Ensemble Artisanal Marrakech
    rating: 4.5,
    priceRange: '$$',
    tags: ['crafts', 'fixed-price', 'gifts'],
    mapsQuery: 'Ensemble Artisanal Marrakech',
    bestFor: ['shopping', 'arts'],
  },
  {
    id: 'bahia-palace',
    name: 'Bahia Palace',
    category: 'monuments',
    city: 'marrakesh',
    neighborhood: 'Medina',
    description: '19th-century palace with painted cedar ceilings, riad courtyards, and mosaic gardens.',
    image: placeImg('bahia-palace.jpg'), // Bahia Palace courtyard
    rating: 4.6,
    priceRange: '$',
    tags: ['palace', 'history', 'photo'],
    mapsQuery: 'Bahia Palace Marrakech',
    bestFor: ['history'],
  },
  {
    id: 'jardin-majorelle',
    name: 'Jardin Majorelle',
    category: 'monuments',
    city: 'marrakesh',
    neighborhood: 'Gueliz',
    description: 'Yves Saint Laurent’s cobalt-blue garden oasis — book timed tickets ahead.',
    image: placeImg('jardin-majorelle.jpg'), // Jardin Majorelle studio / garden
    rating: 4.8,
    priceRange: '$$',
    tags: ['garden', 'museum', 'must-see'],
    mapsQuery: 'Jardin Majorelle Marrakech',
    bestFor: ['history', 'arts'],
  },
  {
    id: 'rick-cafe',
    name: "Rick's Café",
    category: 'restaurants',
    city: 'casablanca',
    neighborhood: 'Old Medina / Port',
    description: 'Casablanca classic inspired by the film — cocktails, live piano, and Atlantic evenings.',
    image: placeImg('ricks-cafe.jpg'), // Rick's Café Casablanca
    rating: 4.4,
    priceRange: '$$$',
    tags: ['dinner', 'cocktails', 'iconic'],
    mapsQuery: "Rick's Cafe Casablanca",
    bestFor: ['food', 'nightlife'],
  },
  {
    id: 'la-sqala',
    name: 'La Sqala',
    category: 'restaurants',
    city: 'casablanca',
    neighborhood: 'Near Port',
    description: 'Garden restaurant inside an old fortress — excellent breakfast and traditional lunch.',
    image: placeImg('la-sqala.jpg'), // La Sqala fortress stairs / walls
    rating: 4.5,
    priceRange: '$$',
    tags: ['garden', 'breakfast', 'local'],
    mapsQuery: 'La Sqala Casablanca',
    bestFor: ['food'],
  },
  {
    id: 'morocco-mall',
    name: 'Morocco Mall',
    category: 'shopping',
    city: 'casablanca',
    neighborhood: 'Ain Diab',
    description: 'Huge coastal mall with global brands, an aquarium, and seaside dining.',
    image: placeImg('morocco-mall.jpg'), // Morocco Mall Casablanca
    rating: 4.3,
    priceRange: '$$$',
    tags: ['mall', 'shopping', 'family'],
    mapsQuery: 'Morocco Mall Casablanca',
    bestFor: ['shopping'],
  },
  {
    id: 'sky-28',
    name: 'Sky 28',
    category: 'nightlife',
    city: 'casablanca',
    neighborhood: 'Kenzi Tower Hotel',
    description: 'Sky-high lounge with city views, cocktails, and a dressy late crowd.',
    image: placeImg('casablanca-skyline.jpg'), // Casablanca skyline / high views
    rating: 4.4,
    priceRange: '$$$$',
    tags: ['rooftop', 'cocktails', 'views'],
    mapsQuery: 'Sky 28 Casablanca',
    bestFor: ['nightlife'],
  },
  {
    id: 'hassan-ii',
    name: 'Hassan II Mosque',
    category: 'monuments',
    city: 'casablanca',
    neighborhood: 'Corniche',
    description: 'One of the world’s largest mosques, built over the Atlantic — timed interior tours available.',
    image: placeImg('hassan-ii.jpg'), // Hassan II Mosque plaza
    rating: 4.9,
    priceRange: '$$',
    tags: ['mosque', 'landmark', 'must-see'],
    mapsQuery: 'Hassan II Mosque Casablanca',
    bestFor: ['history'],
  },
  {
    id: 'twin-center',
    name: 'Twin Center / Maarif Shopping',
    category: 'shopping',
    city: 'casablanca',
    neighborhood: 'Maarif',
    description: 'Maarif’s shopping spine — boutiques, cafés, and evening strolls.',
    image: placeImg('twin-center.jpg'), // Twin Center Casablanca
    rating: 4.2,
    priceRange: '$$',
    tags: ['boutiques', 'cafes', 'urban'],
    mapsQuery: 'Twin Center Casablanca',
    bestFor: ['shopping'],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'quad-agafay',
    title: 'Agafay Desert Quad Biking',
    location: 'Agafay Stone Desert',
    city: 'Marrakech',
    image: unsplash('photo-1544551763-46a013bb70d5'),
    price: 'From 450 MAD',
    duration: '2–4 hours',
    description: 'Throttle through Agafay’s lunar hills on a guided quad tour — sunset packages with mint tea included.',
    category: 'adventure',
    included: ['Helmet & guide', 'Hotel pickup options', 'Tea stop'],
    partnerType: 'Adventure operator',
  },
  {
    id: 'paraglide-atlas',
    title: 'Atlas Paragliding',
    location: 'High Atlas foothills',
    city: 'Marrakech',
    image: unsplash('photo-1506905925346-21bda4d32df4'),
    price: 'From 800 MAD',
    duration: 'Half day',
    description: 'Tandem paraglide over villages and valleys with certified instructors — photos & video add-ons available.',
    category: 'sky',
    included: ['Tandem flight', 'Instructor', 'Transport from city'],
    partnerType: 'Sky sports',
  },
  {
    id: 'hot-air-balloon',
    title: 'Sunrise Hot Air Balloon',
    location: 'Palm groves outside Marrakech',
    city: 'Marrakech',
    image: unsplash('photo-1507608869274-d3177c8bb4c7'),
    price: 'From 1,900 MAD',
    duration: '5 hours',
    description: 'Float at sunrise over the Haouz plain, then land for a Berber breakfast.',
    category: 'sky',
    included: ['Flight', 'Breakfast', 'Certificate'],
    partnerType: 'Balloon operator',
  },
  {
    id: 'merzouga-camel',
    title: 'Merzouga Camel Trek & Camp',
    location: 'Erg Chebbi',
    city: 'Sahara',
    image: unsplash('photo-1509316975850-ff9c5deb0cd9'),
    price: 'From 1,200 MAD',
    duration: 'Overnight',
    description: 'Camel into the dunes for sunset, dinner under the stars, and a desert camp stay.',
    category: 'desert',
    included: ['Camel trek', 'Dinner & breakfast', 'Camp night'],
    partnerType: 'Desert camp',
  },
  {
    id: 'essaouira-kite',
    title: 'Essaouira Kitesurf Session',
    location: 'Essaouira Bay',
    city: 'Atlantic Coast',
    image: unsplash('photo-1502680390469-be75c86b636f'),
    price: 'From 600 MAD',
    duration: '2–3 hours',
    description: 'Lessons or equipment hire on Morocco’s wind capital — beginner to advanced.',
    category: 'adventure',
    included: ['Gear', 'Instructor option', 'Beach access'],
    partnerType: 'Water sports',
  },
  {
    id: 'hammam-spa',
    title: 'Traditional Hammam & Argan Ritual',
    location: 'Marrakech spas & riads',
    city: 'Marrakech',
    image: unsplash('photo-1540555700478-4be289fbecef'),
    price: 'From 350 MAD',
    duration: '1.5–3 hours',
    description: 'Black soap scrub, steam, and argan oil massage — book partner spas through MoroccoMate.',
    category: 'culture',
    included: ['Hammam access', 'Scrub', 'Tea'],
    partnerType: 'Wellness / spa',
  },
];

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function placesForCity(city: string) {
  const key = city.toLowerCase().includes('casa') ? 'casablanca' : 'marrakesh';
  return PLACES.filter((p) => p.city === key);
}

export function pickPlaces(
  city: string,
  interests: string[],
  count: number
): Place[] {
  const pool = placesForCity(city);
  const scored = pool
    .map((p) => ({
      place: p,
      score:
        p.bestFor.filter((b) => interests.includes(b)).length * 3 +
        (interests.includes('food') && p.category === 'restaurants' ? 2 : 0) +
        (interests.includes('nightlife') && p.category === 'nightlife' ? 3 : 0) +
        (interests.includes('shopping') && p.category === 'shopping' ? 3 : 0) +
        Math.random(),
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.place);

  const unique: Place[] = [];
  for (const p of scored) {
    if (!unique.find((u) => u.id === p.id)) unique.push(p);
    if (unique.length >= count) break;
  }
  for (const p of pool) {
    if (unique.length >= count) break;
    if (!unique.find((u) => u.id === p.id)) unique.push(p);
  }
  return unique;
}
