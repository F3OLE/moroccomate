export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  city?: string;
  tags: string[];
  /** Plain sections for the article body */
  sections: { heading?: string; paragraphs: string[] }[];
  cta?: { label: string; href: string };
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-avoid-scams-in-morocco',
    title: 'How to Avoid Scams in Morocco (Local Tips)',
    description:
      'Practical scam warnings for Marrakech, Casablanca, and beyond. Fake guides, taxi tricks, souk overcharging, and what locals actually do.',
    publishedAt: '2026-09-22',
    city: 'Morocco',
    tags: ['safety', 'tips', 'marrakech', 'first-timers'],
    sections: [
      {
        paragraphs: [
          'Morocco is welcoming and safe for most travelers. Still, tourist areas attract hustles. Knowing the common ones saves money and stress, especially in Marrakech medina and near major landmarks.',
          'This is written for first-timers. Not fear-mongering. Just what to watch for and how to handle it calmly.',
        ],
      },
      {
        heading: 'Fake “guides” and “closed today” stories',
        paragraphs: [
          'Near Jemaa el-Fnaa, Bahia Palace, or Majorelle, someone may say the entrance is closed and offer to show you a better route. Often they want a commission from a shop or a tip you did not agree to.',
          'What to do: smile, say no thanks, and keep walking. Official sites have tickets and hours posted. If you want a guide, book a licensed one or go through a riad you trust.',
        ],
      },
      {
        heading: 'Taxi tricks',
        paragraphs: [
          'Petit taxis should use the meter in cities like Marrakech and Casablanca. Some drivers claim the meter is broken and quote a tourist price.',
          'What to do: ask for the meter before you get in. If they refuse, take the next taxi. At night or from the airport, agree on a price before the ride if there is no meter culture for that trip. Save Careem / inDrive where available as a backup.',
        ],
      },
      {
        heading: 'Souk overcharging and the “free gift” loop',
        paragraphs: [
          'Haggling is normal in souks. Starting prices for tourists can be several times local prices. That is negotiation, not always a scam. Pressure and guilt trips are the problem.',
          'What to do: decide your max price before you talk. Walk away if it feels wrong. You do not owe anyone a purchase because they poured you tea. Fixed-price places like Ensemble Artisanal exist when you want zero haggling.',
        ],
      },
      {
        heading: 'Currency and card tips',
        paragraphs: [
          'Exchange at banks or reputable offices. Avoid random street money changers. Count your notes before you leave the counter.',
          'Cards work in malls and many restaurants. Carry small cash for taxis, tips, and medina shops. Do not flash thick wads of cash in crowded lanes.',
        ],
      },
      {
        heading: 'Quick rules that work',
        paragraphs: [
          'Be polite and firm. “La, shukran” (no, thank you) ends most pitches.',
          'Use Google Maps for walking routes instead of following strangers “shortcuts.”',
          'Book popular restaurants and clubs ahead on weekends so you are not steered into commission spots.',
          'If something feels off, leave. Morocco has plenty of great places that do not need a hard sell.',
        ],
      },
    ],
    cta: {
      label: 'Plan a trip with real spots',
      href: '/plan',
    },
  },
  {
    slug: 'morocco-itinerary-5-and-7-days',
    title: 'Morocco Itinerary: 5 Days and 7 Days (Realistic Plans)',
    description:
      'Simple 5-day and 7-day Morocco trip ideas for Marrakech and Casablanca. Less rushing, more real meals, nightlife, and day trips.',
    publishedAt: '2026-09-22',
    city: 'Morocco',
    tags: ['itinerary', 'marrakech', 'casablanca', 'planning'],
    sections: [
      {
        paragraphs: [
          'Most “Morocco in 5 days” guides try to cover Marrakech, Fes, the desert, and the coast. That is a lot of transit for little enjoyment.',
          'These plans stay realistic: pick a base city, do day trips, and leave room for food and evenings. Use our planner to customize dates and interests.',
        ],
      },
      {
        heading: '5 days: Marrakech base',
        paragraphs: [
          'Day 1: Medina walk, Bahia or a quieter monument in the morning, lunch in the medina, sunset rooftop, early night.',
          'Day 2: Majorelle or a garden morning, Gueliz / Hivernage afternoon for cafés and shopping, dinner show or club if that is your vibe.',
          'Day 3: Ourika Valley or a pool / beach-club day outside the center. Recover from the medina intensity.',
          'Day 4: Souks and fixed-price artisan shopping, hammam late afternoon, relaxed dinner.',
          'Day 5: Slow breakfast, one last neighborhood (Kasbah or Guéliz), transfer out.',
        ],
      },
      {
        heading: '7 days: Marrakech + one side trip',
        paragraphs: [
          'Use the 5-day Marrakech base, then add:',
          'Day 6: Agafay desert evening (quad or pool camp) or Essaouira as a long day / overnight if you like the coast.',
          'Day 7: Buffer day for shopping, a second hammam, or Casablanca if you fly out from CMN and want Hassan II Mosque + Corniche.',
        ],
      },
      {
        heading: '5 days: Casablanca + Rabat',
        paragraphs: [
          'Day 1: Hassan II Mosque, Corniche walk at golden hour, dinner with Atlantic views.',
          'Day 2: Gauthier cafés, Maarif shopping, nightlife if you want clubs.',
          'Day 3: Habous quarter and a slower cultural day.',
          'Day 4: Train or drive to Rabat. Kasbah des Oudayas, Café Maure, Hassan Tower.',
          'Day 5: Chellah or marina evening, back to Casa for your flight.',
        ],
      },
      {
        heading: 'How to use MoroccoMate',
        paragraphs: [
          'Open Plan a trip, pick your city and dates (up to 3 weeks), choose interests like food, nightlife, or pools, and generate a day-by-day schedule with Maps links.',
          'Edit anything you do not like. Partner spots can be booked through MoroccoMate so you are not hunting numbers in the medina.',
        ],
      },
    ],
    cta: {
      label: 'Build your itinerary',
      href: '/plan',
    },
  },
  {
    slug: 'things-to-do-in-marrakech',
    title: 'Things to Do in Marrakech (Beyond the Usual List)',
    description:
      'Marrakech ideas that mix classics with local favorites: rooftops, souks, pools, nightlife, and day trips without the tourist checklist feel.',
    publishedAt: '2026-09-22',
    city: 'Marrakech',
    tags: ['marrakech', 'things-to-do', 'nightlife', 'food'],
    sections: [
      {
        paragraphs: [
          'Marrakech rewards slow mornings and intentional evenings. You do not need to “see everything.” Pick a few anchors and leave gaps for mint tea and people-watching.',
          'Here is a practical mix of classics and places travelers actually enjoy.',
        ],
      },
      {
        heading: 'Medina classics (worth it once)',
        paragraphs: [
          'Jemaa el-Fnaa at late afternoon, not only at peak night chaos. Watch from a rooftop if crowds stress you out.',
          'Bahia Palace for courtyards and craftsmanship. Go early.',
          'Souk Semmarine for the atmosphere. Buy later at calmer stalls or fixed-price artisan shops if haggling drains you.',
        ],
      },
      {
        heading: 'Food and rooftops',
        paragraphs: [
          'Rooftop dinners in the medina are a Marrakech staple. Book ahead on weekends.',
          'For a calmer lunch, courtyard spots away from the main square are easier.',
          'Ask your riad for a current favorite. Places rotate in popularity fast.',
        ],
      },
      {
        heading: 'Pools, clubs, and nights out',
        paragraphs: [
          'Marrakech has no ocean beach in the city. Pool clubs and hotel day passes fill that gap (Nikki Beach style venues, Beldi, desert pool camps in Agafay).',
          'Hivernage is the main nightlife pocket for dinner shows and clubs. Dress codes are real. Book tables when you can.',
        ],
      },
      {
        heading: 'Day trips that feel worth the drive',
        paragraphs: [
          'Ourika Valley for river cafés and cooler air.',
          'Agafay for sunset and a different landscape without the full Sahara trek.',
          'Atlas foothills for paragliding or a quiet mountain lunch if adventure is on your list.',
        ],
      },
      {
        heading: 'Build it into a real day plan',
        paragraphs: [
          'Browse Discover for mapped spots, then use Plan a trip to turn interests into a schedule with times and Maps links.',
          'That combo beats copying a generic “top 20” list that does not fit your dates or energy.',
        ],
      },
    ],
    cta: {
      label: 'See Marrakech places',
      href: '/discover',
    },
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllSlugs() {
  return BLOG_POSTS.map((p) => p.slug);
}
