export type PlaceCity = 'marrakesh' | 'casablanca' | 'rabat' | 'tangier' | 'nationwide';

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
  city: PlaceCity;
  neighborhood: string;
  description: string;
  image: string;
  /** CSS object-position so the right part of the photo shows in wide hover rows */
  imageFocus?: string;
  rating: number;
  priceRange: string;
  tags: string[];
  mapsQuery: string;
  bestFor: string[];
  /** Human hint e.g. "Sunset · 18:30-19:30" */
  bestTime?: string;
  preferredSlot?: 'morning' | 'afternoon' | 'evening' | 'lunch' | 'dinner';
  /** Partner / verified listing for monetization */
  badge?: 'partner' | 'verified';
  /** Venue WhatsApp in international digits, e.g. 2126xxxxxxxx */
  whatsapp?: string;
}

export interface Experience {
  id: string;
  title: string;
  location: string;
  city: string;
  image: string;
  imageFocus?: string;
  price: string;
  duration: string;
  description: string;
  category: 'adventure' | 'sky' | 'desert' | 'culture' | 'nightlife';
  included: string[];
  partnerType: string;
}

/** Local Wikimedia photos matched to the actual venues / landmarks. */
const placeImg = (file: string) => `/images/places/${file}`;

export const PLACES: Place[] = [
  // --- Marrakech ---
  {
    id: 'nomad-marrakech',
    name: 'Nomad',
    category: 'restaurants',
    city: 'marrakesh',
    neighborhood: 'Medina · Rooftop',
    description:
      'Modern Moroccan plates with one of the best Medina rooftop views. Mint lemonade, lamb shoulder, and sunset crowds.',
    image: placeImg('jemaa-sunset.jpg'),
    imageFocus: 'center 42%',
    rating: 4.6,
    priceRange: '$$$',
    tags: ['rooftop', 'dinner', 'instagram'],
    mapsQuery: 'Nomad Restaurant Marrakech',
    bestFor: ['food', 'nightlife'],
    bestTime: 'Sunset dinner · 18:30-21:00',
    preferredSlot: 'evening',
    badge: 'partner',
  },
  {
    id: 'le-jardin-marrakech',
    name: 'Le Jardin',
    category: 'restaurants',
    city: 'marrakesh',
    neighborhood: 'Souk El Jeld',
    description:
      'Hidden courtyard restaurant under banana trees. Great for lunch after souk shopping.',
    image: placeImg('le-jardin.jpg'),
    imageFocus: 'center center',
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
    description:
      'Classic spice-square café for people-watching, fresh juices, and light Moroccan bites.',
    image: placeImg('cafe-des-epices.jpg'),
    imageFocus: 'center 22%',
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
    description:
      'Dinner-show venue with belly dance, DJ energy, and a late-night crowd. Classic Marrakech night out.',
    image: placeImg('riad-courtyard.jpg'),
    imageFocus: 'center 70%',
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
    description:
      'One of Marrakech’s main party spots. International DJs, bottle service, and a dressy scene.',
    image: placeImg('sofitel-marrakech.jpg'),
    imageFocus: 'center 55%',
    rating: 4.2,
    priceRange: '$$$$',
    tags: ['club', 'DJ', 'party'],
    mapsQuery: 'Theatro Club Sofitel Marrakech',
    bestFor: ['nightlife'],
    bestTime: 'Late night · from 23:00',
    preferredSlot: 'evening',
    badge: 'partner',
  },
  {
    id: 'souk-semmarine',
    name: 'Souk Semmarine',
    category: 'shopping',
    city: 'marrakesh',
    neighborhood: 'Medina Souks',
    description:
      'Main covered souk lane for leather, lanterns, carpets, and spices. Bargain hard, stay polite.',
    image: placeImg('souk-semmarine.jpg'),
    imageFocus: 'center 45%',
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
    description:
      'Fixed-price artisan co-op for quality leather, ceramics, and textiles without aggressive haggling.',
    image: placeImg('ensemble-artisanal.jpg'),
    imageFocus: 'center center',
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
    description:
      '19th-century palace with painted cedar ceilings, riad courtyards, and mosaic gardens.',
    image: placeImg('bahia-palace.jpg'),
    imageFocus: 'center 40%',
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
    description:
      'Yves Saint Laurent’s cobalt-blue garden oasis. Book timed tickets ahead.',
    image: placeImg('jardin-majorelle.jpg'),
    imageFocus: 'center 35%',
    rating: 4.8,
    priceRange: '$$',
    tags: ['garden', 'museum', 'must-see'],
    mapsQuery: 'Jardin Majorelle Marrakech',
    bestFor: ['history', 'arts'],
  },
  {
    id: 'nikki-beach-marrakech',
    name: 'Nikki Beach Marrakech',
    category: 'experiences',
    city: 'marrakesh',
    neighborhood: 'Route d’Ourika',
    description:
      'The big pool-club day: cabanas, DJs, champagne, and Instagram floats. Marrakech’s beach without the ocean.',
    image: placeImg('sofitel-marrakech.jpg'),
    rating: 4.4,
    priceRange: '$$$$',
    tags: ['pool', 'beach-club', 'dj', 'tiktok', 'instagram'],
    mapsQuery: 'Nikki Beach Marrakech',
    bestFor: ['nightlife', 'adventure', 'pools'],
    bestTime: 'Afternoon pool · 13:00-18:00',
    preferredSlot: 'afternoon',
    badge: 'partner',
  },
  {
    id: 'beldi-country-club',
    name: 'Beldi Country Club',
    category: 'experiences',
    city: 'marrakesh',
    neighborhood: 'Route de Barrage',
    description:
      'Palm-lined pools, hammam, and garden lounging. Calmer day-pass energy than the party clubs.',
    image: placeImg('jardin-majorelle.jpg'),
    rating: 4.6,
    priceRange: '$$$',
    tags: ['pool', 'garden', 'day-pass', 'instagram'],
    mapsQuery: 'Beldi Country Club Marrakech',
    bestFor: ['adventure', 'pools'],
  },
  {
    id: 'oasiria',
    name: 'Oasiria Water Park',
    category: 'experiences',
    city: 'marrakesh',
    neighborhood: 'Route d’Amiizmiz',
    description:
      'Slides, wave pool, and lazy river. Best family / friends pool day when you want actual water rides.',
    image: placeImg('le-jardin.jpg'),
    rating: 4.3,
    priceRange: '$$',
    tags: ['pool', 'waterpark', 'family', 'tiktok'],
    mapsQuery: 'Oasiria Marrakech',
    bestFor: ['adventure', 'pools'],
  },
  {
    id: 'agafay-pool-camp',
    name: 'Agafay Desert Pool Camp',
    category: 'experiences',
    city: 'marrakesh',
    neighborhood: 'Agafay Stone Desert',
    description:
      'Infinity pool in the stone desert. Sunset dips, camel selfies, and dinner under the stars.',
    image: '/images/experiences/agafay.jpg',
    rating: 4.7,
    priceRange: '$$$$',
    tags: ['pool', 'desert', 'sunset', 'instagram', 'tiktok'],
    mapsQuery: 'Agafay desert pool camp Marrakech',
    bestFor: ['adventure', 'pools', 'nightlife'],
    bestTime: 'Sunset dip · 17:00-19:30',
    preferredSlot: 'afternoon',
    badge: 'verified',
  },
  {
    id: 'lotus-club-pool',
    name: 'Lotus Club Pool Day',
    category: 'nightlife',
    city: 'marrakesh',
    neighborhood: 'Palmerie / outskirts',
    description:
      'Pool party Sundays. House music, bottle service, and the classic Kech club-by-day vibe.',
    image: placeImg('sofitel-marrakech.jpg'),
    rating: 4.2,
    priceRange: '$$$',
    tags: ['pool', 'party', 'dj', 'tiktok'],
    mapsQuery: 'Lotus Club Marrakech pool',
    bestFor: ['nightlife', 'pools'],
  },
  {
    id: 'mamounia-pool',
    name: 'La Mamounia Garden Pool',
    category: 'experiences',
    city: 'marrakesh',
    neighborhood: 'Bab Jdid',
    description:
      'Iconic hotel pool set in centuries-old gardens. Dressy, photogenic, book a day table if you can.',
    image: placeImg('le-jardin.jpg'),
    rating: 4.8,
    priceRange: '$$$$',
    tags: ['pool', 'luxury', 'garden', 'instagram'],
    mapsQuery: 'La Mamounia pool Marrakech',
    bestFor: ['pools', 'food'],
  },
  {
    id: 'ourika-river-day',
    name: 'Ourika Valley River Pools',
    category: 'experiences',
    city: 'marrakesh',
    neighborhood: 'Ourika Valley · Atlas',
    description:
      'Day trip into the foothills. Riverside cafés, cold mountain pools, and waterfall walks.',
    image: '/images/experiences/atlas.jpg',
    rating: 4.5,
    priceRange: '$$',
    tags: ['river', 'nature', 'day-trip', 'instagram'],
    mapsQuery: 'Ourika Valley waterfalls Marrakech',
    bestFor: ['adventure', 'pools'],
  },

  // --- Casablanca (social / vibe-heavy) ---
  {
    id: 'rick-cafe',
    name: "Rick's Café",
    category: 'restaurants',
    city: 'casablanca',
    neighborhood: 'Old Medina / Port',
    description:
      'Casablanca classic inspired by the film. Cocktails, live piano, and Atlantic evenings.',
    image: placeImg('ricks-cafe.jpg'),
    imageFocus: 'center 40%',
    rating: 4.4,
    priceRange: '$$$',
    tags: ['dinner', 'cocktails', 'iconic', 'instagram'],
    mapsQuery: "Rick's Cafe Casablanca",
    bestFor: ['food', 'nightlife'],
  },
  {
    id: 'la-sqala',
    name: 'La Sqala',
    category: 'restaurants',
    city: 'casablanca',
    neighborhood: 'Near Port',
    description:
      'Garden restaurant inside an old fortress. Excellent breakfast and traditional lunch.',
    image: placeImg('la-sqala.jpg'),
    rating: 4.5,
    priceRange: '$$',
    tags: ['garden', 'breakfast', 'local', 'instagram'],
    mapsQuery: 'La Sqala Casablanca',
    bestFor: ['food'],
  },
  {
    id: 'cabestan',
    name: 'Le Cabestan',
    category: 'restaurants',
    city: 'casablanca',
    neighborhood: 'El Hank · Corniche',
    description:
      'Cliffside seafood & cocktails over the Atlantic. Heavy on TikTok sunsets and dressy dinners.',
    image: placeImg('casablanca-skyline.jpg'),
    rating: 4.5,
    priceRange: '$$$$',
    tags: ['seafood', 'sunset', 'tiktok', 'instagram'],
    mapsQuery: 'Le Cabestan Casablanca',
    bestFor: ['food', 'nightlife'],
    bestTime: 'Sunset · 18:30-20:30',
    preferredSlot: 'evening',
    badge: 'partner',
  },
  {
    id: 'basmane-casa',
    name: 'Basmane',
    category: 'restaurants',
    city: 'casablanca',
    neighborhood: 'Gauthier',
    description:
      'Trendy Gauthier spot for sharing plates and late dinners. Always in Casa food reels.',
    image: placeImg('ricks-cafe.jpg'),
    rating: 4.4,
    priceRange: '$$$',
    tags: ['gauthier', 'dinner', 'tiktok'],
    mapsQuery: 'Basmane Restaurant Casablanca',
    bestFor: ['food'],
  },
  {
    id: 'orange-mecanique',
    name: "L'Orange Mécanique",
    category: 'nightlife',
    city: 'casablanca',
    neighborhood: 'Maarif',
    description: 'Cult Casa nightlife address. Loud, late, and packed on weekends.',
    image: placeImg('casablanca-skyline.jpg'),
    rating: 4.2,
    priceRange: '$$$',
    tags: ['club', 'party', 'tiktok'],
    mapsQuery: "L'Orange Mecanique Casablanca",
    bestFor: ['nightlife'],
  },
  {
    id: 'sky-28',
    name: 'Sky 28',
    category: 'nightlife',
    city: 'casablanca',
    neighborhood: 'Kenzi Tower Hotel',
    description:
      'Sky-high lounge with city views, cocktails, and a dressy late crowd.',
    image: placeImg('casablanca-skyline.jpg'),
    rating: 4.4,
    priceRange: '$$$$',
    tags: ['rooftop', 'cocktails', 'views', 'instagram'],
    mapsQuery: 'Sky 28 Casablanca',
    bestFor: ['nightlife'],
    bestTime: 'Night drinks · from 21:00',
    preferredSlot: 'evening',
    badge: 'verified',
  },
  {
    id: 'vip-club-casa',
    name: 'VIP Club',
    category: 'nightlife',
    city: 'casablanca',
    neighborhood: 'Ain Diab',
    description:
      'Corniche club energy. Bottle service, guest DJs, dress code nights.',
    image: placeImg('casablanca-skyline.jpg'),
    rating: 4.1,
    priceRange: '$$$$',
    tags: ['club', 'corniche', 'party'],
    mapsQuery: 'VIP Club Ain Diab Casablanca',
    bestFor: ['nightlife'],
  },
  {
    id: 'gauthier-brunch',
    name: 'Gauthier Café Hop',
    category: 'cafes',
    city: 'casablanca',
    neighborhood: 'Gauthier',
    description:
      'Walk the tree-lined streets for specialty coffee, matcha, and pastry spots blowing up on IG.',
    image: placeImg('cafe-des-epices.jpg'),
    rating: 4.3,
    priceRange: '$$',
    tags: ['cafe', 'brunch', 'instagram', 'tiktok'],
    mapsQuery: 'Gauthier Casablanca cafes',
    bestFor: ['food'],
  },
  {
    id: 'anfa-place',
    name: 'Anfa Place Mall',
    category: 'shopping',
    city: 'casablanca',
    neighborhood: 'Anfa / Corniche',
    description:
      'Oceanfront mall with fashion, cinema, and terrace dining. Easy half-day hang.',
    image: placeImg('morocco-mall.jpg'),
    rating: 4.2,
    priceRange: '$$$',
    tags: ['mall', 'corniche', 'family'],
    mapsQuery: 'Anfa Place Mall Casablanca',
    bestFor: ['shopping'],
  },
  {
    id: 'morocco-mall',
    name: 'Morocco Mall',
    category: 'shopping',
    city: 'casablanca',
    neighborhood: 'Ain Diab',
    description:
      'Huge coastal mall with global brands, an aquarium, and seaside dining.',
    image: placeImg('morocco-mall.jpg'),
    rating: 4.3,
    priceRange: '$$$',
    tags: ['mall', 'shopping', 'family'],
    mapsQuery: 'Morocco Mall Casablanca',
    bestFor: ['shopping'],
  },
  {
    id: 'twin-center',
    name: 'Twin Center / Maarif Shopping',
    category: 'shopping',
    city: 'casablanca',
    neighborhood: 'Maarif',
    description: 'Maarif’s shopping spine. Boutiques, cafés, and evening strolls.',
    image: placeImg('twin-center.jpg'),
    rating: 4.2,
    priceRange: '$$',
    tags: ['boutiques', 'cafes', 'urban', 'instagram'],
    mapsQuery: 'Twin Center Casablanca',
    bestFor: ['shopping'],
  },
  {
    id: 'habous-quarter',
    name: 'Habous Quarter',
    category: 'shopping',
    city: 'casablanca',
    neighborhood: 'Nouvelle Medina',
    description:
      'Neo-traditional souk for spices, babouches, and olives. Photogenic arches everywhere.',
    image: placeImg('souk-semmarine.jpg'),
    rating: 4.6,
    priceRange: '$$',
    tags: ['souk', 'crafts', 'instagram'],
    mapsQuery: 'Quartier Habous Casablanca',
    bestFor: ['shopping', 'arts', 'history'],
  },
  {
    id: 'hassan-ii',
    name: 'Hassan II Mosque',
    category: 'monuments',
    city: 'casablanca',
    neighborhood: 'Corniche',
    description:
      'One of the world’s largest mosques, built over the Atlantic. Timed interior tours available.',
    image: placeImg('hassan-ii.jpg'),
    rating: 4.9,
    priceRange: '$$',
    tags: ['mosque', 'landmark', 'must-see', 'instagram'],
    mapsQuery: 'Hassan II Mosque Casablanca',
    bestFor: ['history'],
  },
  {
    id: 'corniche-ain-diab',
    name: 'Corniche Ain Diab Walk',
    category: 'experiences',
    city: 'casablanca',
    neighborhood: 'Ain Diab',
    description:
      'Beach promenade for sunset rides, ice cream, and beach-club energy. Casa’s social strip.',
    image: placeImg('casablanca-skyline.jpg'),
    rating: 4.5,
    priceRange: '$$',
    tags: ['beach', 'sunset', 'tiktok', 'walk'],
    mapsQuery: 'Corniche Ain Diab Casablanca',
    bestFor: ['nightlife', 'adventure'],
    bestTime: 'Golden hour · 17:30-19:30',
    preferredSlot: 'evening',
  },

  // --- Rabat ---
  {
    id: 'cafe-maure-oudayas',
    name: 'Café Maure · Oudayas',
    category: 'cafes',
    city: 'rabat',
    neighborhood: 'Kasbah des Oudayas',
    description:
      'Mint tea with ocean views inside the blue-and-white kasbah. Rabat’s most posted terrace.',
    image: placeImg('cafe-des-epices.jpg'),
    rating: 4.7,
    priceRange: '$',
    tags: ['tea', 'kasbah', 'instagram', 'tiktok'],
    mapsQuery: 'Cafe Maure Kasbah des Oudayas Rabat',
    bestFor: ['food', 'history'],
    bestTime: 'Late afternoon tea · 16:00-18:30',
    preferredSlot: 'afternoon',
    badge: 'verified',
  },
  {
    id: 'dinarjat-rabat',
    name: 'Dinarjat',
    category: 'restaurants',
    city: 'rabat',
    neighborhood: 'Medina',
    description:
      'Traditional Moroccan feast in a restored riad. Live music some nights.',
    image: placeImg('le-jardin.jpg'),
    rating: 4.5,
    priceRange: '$$$',
    tags: ['riad', 'dinner', 'traditional'],
    mapsQuery: 'Dinarjat Restaurant Rabat',
    bestFor: ['food'],
  },
  {
    id: 'le-dhow-rabat',
    name: 'Le Dhow',
    category: 'restaurants',
    city: 'rabat',
    neighborhood: 'Bouregreg Marina',
    description:
      'Dinner on a wooden boat at the marina. Lights on the water, very reel-friendly.',
    image: placeImg('ricks-cafe.jpg'),
    rating: 4.4,
    priceRange: '$$$',
    tags: ['marina', 'dinner', 'instagram'],
    mapsQuery: 'Le Dhow Rabat',
    bestFor: ['food', 'nightlife'],
    bestTime: 'Dinner on the water · 19:00-22:00',
    preferredSlot: 'evening',
    badge: 'partner',
  },
  {
    id: 'agdal-shopping',
    name: 'Agdal & Hay Riad',
    category: 'shopping',
    city: 'rabat',
    neighborhood: 'Agdal',
    description:
      'Modern Rabat shopping. Malls, boutiques, and café culture away from the medina.',
    image: placeImg('twin-center.jpg'),
    rating: 4.2,
    priceRange: '$$',
    tags: ['mall', 'boutiques', 'urban'],
    mapsQuery: 'Agdal Rabat shopping',
    bestFor: ['shopping'],
  },
  {
    id: 'kasbah-oudayas',
    name: 'Kasbah des Oudayas',
    category: 'monuments',
    city: 'rabat',
    neighborhood: 'Oudayas',
    description:
      'Andalusian-style kasbah gates, blue alleys, and Atlantic overlooks.',
    image: placeImg('bahia-palace.jpg'),
    rating: 4.8,
    priceRange: '$',
    tags: ['kasbah', 'photo', 'must-see', 'instagram'],
    mapsQuery: 'Kasbah des Oudayas Rabat',
    bestFor: ['history', 'arts'],
  },
  {
    id: 'hassan-tower',
    name: 'Hassan Tower & Mausoleum',
    category: 'monuments',
    city: 'rabat',
    neighborhood: 'Hassan',
    description:
      'Iconic unfinished minaret paired with the Mohammed V mausoleum. Guard ceremony photo ops.',
    image: placeImg('hassan-ii.jpg'),
    rating: 4.7,
    priceRange: '$',
    tags: ['landmark', 'history', 'instagram'],
    mapsQuery: 'Tour Hassan Rabat',
    bestFor: ['history'],
  },
  {
    id: 'chellah-rabat',
    name: 'Chellah Necropolis',
    category: 'monuments',
    city: 'rabat',
    neighborhood: 'Chellah',
    description:
      'Roman + Merinid ruins with stork nests and gardens. Quiet golden-hour walks.',
    image: placeImg('jardin-majorelle.jpg'),
    rating: 4.6,
    priceRange: '$',
    tags: ['ruins', 'garden', 'photo'],
    mapsQuery: 'Chellah Rabat',
    bestFor: ['history', 'adventure'],
  },
  {
    id: 'bouregreg-marina',
    name: 'Bouregreg Marina Night',
    category: 'nightlife',
    city: 'rabat',
    neighborhood: 'Salé side / Marina',
    description:
      'Waterfront bars and restaurants with soft nightlife. Less chaotic than Casa clubs.',
    image: placeImg('casablanca-skyline.jpg'),
    rating: 4.3,
    priceRange: '$$$',
    tags: ['marina', 'drinks', 'evening'],
    mapsQuery: 'Bouregreg Marina Rabat',
    bestFor: ['nightlife', 'food'],
    bestTime: 'Evening lights · 19:30-23:00',
    preferredSlot: 'evening',
  },

  // --- Tangier ---
  {
    id: 'cafe-hafa',
    name: 'Café Hafa',
    category: 'cafes',
    city: 'tangier',
    neighborhood: 'Kasbah cliff',
    description:
      'Legendary cliff café overlooking the Strait. Mint tea, sunset, and endless TikToks.',
    image: placeImg('cafe-des-epices.jpg'),
    rating: 4.8,
    priceRange: '$',
    tags: ['tea', 'sunset', 'tiktok', 'instagram', 'iconic'],
    mapsQuery: 'Cafe Hafa Tangier',
    bestFor: ['food', 'history'],
    bestTime: 'Sunset tea · 18:00-19:30',
    preferredSlot: 'evening',
    badge: 'verified',
  },
  {
    id: 'petit-socco',
    name: 'Petit Socco Cafés',
    category: 'cafes',
    city: 'tangier',
    neighborhood: 'Medina',
    description:
      'Historic square for people-watching. Gran Café de Paris energy and medina buzz.',
    image: placeImg('cafe-des-epices.jpg'),
    rating: 4.4,
    priceRange: '$$',
    tags: ['medina', 'cafe', 'instagram'],
    mapsQuery: 'Petit Socco Tangier',
    bestFor: ['food', 'history'],
  },
  {
    id: 'restaurant-hamadi',
    name: 'Restaurant Hamadi',
    category: 'restaurants',
    city: 'tangier',
    neighborhood: 'Medina',
    description:
      'Classic Tangier Moroccan kitchen. Couscous, pastilla, and old-school hospitality.',
    image: placeImg('le-jardin.jpg'),
    rating: 4.3,
    priceRange: '$$',
    tags: ['traditional', 'dinner', 'local'],
    mapsQuery: 'Restaurant Hamadi Tangier',
    bestFor: ['food'],
  },
  {
    id: 'cap-spartel',
    name: 'Cap Spartel & Hercules Cave',
    category: 'experiences',
    city: 'tangier',
    neighborhood: 'Cap Spartel',
    description:
      'Where Atlantic meets Mediterranean. Lighthouse views and the Africa-shaped cave.',
    image: placeImg('casablanca-skyline.jpg'),
    rating: 4.7,
    priceRange: '$$',
    tags: ['viewpoint', 'nature', 'tiktok', 'must-see'],
    mapsQuery: 'Cap Spartel Hercules Cave Tangier',
    bestFor: ['adventure', 'history'],
    bestTime: 'Morning or late afternoon · 09:00-11:00 / 16:00-18:00',
    preferredSlot: 'morning',
    badge: 'verified',
  },
  {
    id: 'tangier-kasbah',
    name: 'Kasbah Museum & Medina',
    category: 'monuments',
    city: 'tangier',
    neighborhood: 'Kasbah',
    description:
      'Whitewashed alleys, palace museum, and rooftop viewpoints over the port.',
    image: placeImg('bahia-palace.jpg'),
    rating: 4.6,
    priceRange: '$',
    tags: ['kasbah', 'museum', 'photo', 'instagram'],
    mapsQuery: 'Kasbah Museum Tangier',
    bestFor: ['history', 'arts'],
  },
  {
    id: 'tangier-beach',
    name: 'Tangier Beach & Corniche',
    category: 'nightlife',
    city: 'tangier',
    neighborhood: 'Malabata / Beach',
    description:
      'Beach clubs, evening walks, and summer nightlife along the bay.',
    image: placeImg('casablanca-skyline.jpg'),
    rating: 4.3,
    priceRange: '$$$',
    tags: ['beach', 'clubs', 'summer', 'tiktok'],
    mapsQuery: 'Tangier beach corniche',
    bestFor: ['nightlife', 'adventure'],
  },
  {
    id: 'grand-socco-souk',
    name: 'Grand Socco & Medina Souks',
    category: 'shopping',
    city: 'tangier',
    neighborhood: 'Medina',
    description:
      'Spices, textiles, and vintage finds between Grand Socco and the old town lanes.',
    image: placeImg('souk-semmarine.jpg'),
    rating: 4.5,
    priceRange: '$$',
    tags: ['souk', 'crafts', 'shopping'],
    mapsQuery: 'Grand Socco Tangier souk',
    bestFor: ['shopping', 'arts'],
  },
  {
    id: 'cinema-rif',
    name: 'Cinémathèque de Tanger',
    category: 'cafes',
    city: 'tangier',
    neighborhood: 'Grand Socco',
    description:
      'Iconic art-house cinema café on the square. Film, books, and creative crowd.',
    image: placeImg('ensemble-artisanal.jpg'),
    rating: 4.5,
    priceRange: '$$',
    tags: ['cinema', 'culture', 'instagram'],
    mapsQuery: 'Cinematheque de Tanger',
    bestFor: ['arts', 'history'],
  },
];

/** Local Wikimedia photos for experience cards. */
const xpImg = (file: string) => `/images/experiences/${file}`;

export const EXPERIENCES: Experience[] = [
  {
    id: 'quad-agafay',
    title: 'Agafay Desert Quad Biking',
    location: 'Agafay Stone Desert',
    city: 'Marrakech',
    image: xpImg('agafay.jpg'),
    imageFocus: 'center 40%',
    price: 'From 450 MAD',
    duration: '2-4 hours',
    description:
      'Throttle through Agafay’s lunar hills on a guided quad tour. Sunset packages with mint tea included.',
    category: 'adventure',
    included: ['Helmet & guide', 'Hotel pickup options', 'Tea stop'],
    partnerType: 'Adventure operator',
  },
  {
    id: 'paraglide-atlas',
    title: 'Atlas Paragliding',
    location: 'High Atlas foothills',
    city: 'Marrakech',
    image: xpImg('atlas.jpg'),
    imageFocus: 'center 35%',
    price: 'From 800 MAD',
    duration: 'Half day',
    description:
      'Tandem paraglide over villages and valleys with certified instructors. Photos & video add-ons available.',
    category: 'sky',
    included: ['Tandem flight', 'Instructor', 'Transport from city'],
    partnerType: 'Sky sports',
  },
  {
    id: 'hot-air-balloon',
    title: 'Sunrise Hot Air Balloon',
    location: 'Palm groves outside Marrakech',
    city: 'Marrakech',
    image: xpImg('balloon.jpg'),
    imageFocus: 'center 30%',
    price: 'From 1,900 MAD',
    duration: '5 hours',
    description:
      'Float at sunrise over the Haouz plain, then land for a Berber breakfast.',
    category: 'sky',
    included: ['Flight', 'Breakfast', 'Certificate'],
    partnerType: 'Balloon operator',
  },
  {
    id: 'merzouga-camel',
    title: 'Merzouga Camel Trek & Camp',
    location: 'Erg Chebbi',
    city: 'Sahara',
    image: xpImg('merzouga.jpg'),
    price: 'From 1,200 MAD',
    duration: 'Overnight',
    description:
      'Camel into the dunes for sunset, dinner under the stars, and a desert camp stay.',
    category: 'desert',
    included: ['Camel trek', 'Dinner & breakfast', 'Camp night'],
    partnerType: 'Desert camp',
  },
  {
    id: 'essaouira-kite',
    title: 'Essaouira Kitesurf Session',
    location: 'Essaouira Bay',
    city: 'Atlantic Coast',
    image: xpImg('essaouira.jpg'),
    price: 'From 600 MAD',
    duration: '2-3 hours',
    description:
      'Lessons or equipment hire on Morocco’s wind capital. Beginner to advanced.',
    category: 'adventure',
    included: ['Gear', 'Instructor option', 'Beach access'],
    partnerType: 'Water sports',
  },
  {
    id: 'hammam-spa',
    title: 'Traditional Hammam & Argan Ritual',
    location: 'Marrakech spas & riads',
    city: 'Marrakech',
    image: xpImg('hammam.jpg'),
    price: 'From 350 MAD',
    duration: '1.5-3 hours',
    description:
      'Black soap scrub, steam, and argan oil massage. Book partner spas through MoroccoMate.',
    category: 'culture',
    included: ['Hammam access', 'Scrub', 'Tea'],
    partnerType: 'Wellness / spa',
  },
];

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function normalizeCityKey(city: string): PlaceCity {
  const c = city.toLowerCase();
  if (c.includes('casa')) return 'casablanca';
  if (c.includes('rabat')) return 'rabat';
  if (c.includes('tang') || c.includes('tanger')) return 'tangier';
  if (c.includes('marr')) return 'marrakesh';
  return 'marrakesh';
}

export function cityDisplayName(city: string) {
  const key = normalizeCityKey(city);
  const names: Record<PlaceCity, string> = {
    marrakesh: 'Marrakech',
    casablanca: 'Casablanca',
    rabat: 'Rabat',
    tangier: 'Tangier',
    nationwide: 'Morocco',
  };
  return names[key];
}

export function placesForCity(city: string) {
  const key = normalizeCityKey(city);
  return PLACES.filter((p) => p.city === key);
}

export function placeBestTime(place: Place): string {
  if (place.bestTime) return place.bestTime;
  if (place.tags.includes('sunset')) return 'Sunset · ~18:30-19:30';
  if (place.category === 'nightlife') return 'Night · from 22:00';
  if (place.category === 'cafes') return 'Morning or late afternoon · 09:00-11:00 / 16:00-18:00';
  if (place.category === 'restaurants') return 'Lunch 12:30-14:30 or dinner from 19:30';
  if (place.category === 'shopping') return 'Late morning to evening · 10:00-19:00';
  if (place.category === 'monuments') return 'Morning · 09:00-12:00 (cooler + fewer crowds)';
  if (place.tags.includes('pool') || place.tags.includes('beach-club'))
    return 'Afternoon · 13:00-18:00';
  return 'Flexible · check hours on Maps';
}

export function placePreferredSlot(
  place: Place
): 'morning' | 'afternoon' | 'evening' | 'lunch' | 'dinner' {
  if (place.preferredSlot) return place.preferredSlot;
  if (place.category === 'nightlife') return 'evening';
  if (place.category === 'restaurants') return 'lunch';
  if (place.category === 'cafes') return 'morning';
  if (place.category === 'monuments') return 'morning';
  if (place.tags.includes('pool') || place.tags.includes('beach-club'))
    return 'afternoon';
  return 'afternoon';
}

export function clockForSlot(
  slot: 'morning' | 'afternoon' | 'evening' | 'lunch' | 'dinner'
) {
  const map = {
    morning: '09:30',
    lunch: '12:30',
    afternoon: '15:00',
    dinner: '19:30',
    evening: '20:30',
  } as const;
  return map[slot];
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
        (interests.includes('pools') &&
        (p.tags.includes('pool') || p.tags.includes('beach-club'))
          ? 4
          : 0) +
        (p.tags.includes('tiktok') || p.tags.includes('instagram') ? 1.5 : 0) +
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
