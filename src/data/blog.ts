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
    title: "How to Avoid Scams in Morocco: A Local's Honest Guide (2027)",
    description:
      'A Marrakech medina local\'s cheat sheet: fake guides, souk prices, taxis, henna hustles, restaurant bill tricks, and real MAD price ranges so you can enjoy Morocco without getting ripped off.',
    publishedAt: '2026-09-22',
    updatedAt: '2026-09-22',
    city: 'Morocco',
    tags: ['safety', 'tips', 'marrakech', 'first-timers', 'scams'],
    sections: [
      {
        paragraphs: [
          'Morocco is one of the safest and most rewarding countries you will ever visit. But like any major tourist destination, there are people who make a living off visitors who do not know the rules. This is not a scare piece. It is a cheat sheet from someone who was born and raised in the Marrakech medina so you can relax and enjoy your trip without getting ripped off.',
        ],
      },
      {
        heading: 'The "Friendly Local" Who Walks You Somewhere',
        paragraphs: [
          'This is the most common one, especially in Marrakech and Fes. Someone approaches you with perfect English, starts a friendly conversation, then offers to walk you to wherever you are going. "Oh, the tanneries? I\'ll show you, it\'s on my way." It is never on their way.',
          'At the end they will demand payment. Usually 100 to 200 MAD for a 5 minute walk. If you refuse, they get loud.',
          'How to handle it: A firm "la shukran" (no thank you) and keep walking. Do not engage in conversation. Do not explain where you are going. If someone is already walking with you and you did not ask for help, stop, say "I\'m fine, thank you," and wait for them to leave. Use Google Maps or MoroccoMate for navigation instead.',
          'The real price if you do want a guide: Licensed guides wear official badges and charge 200 to 400 MAD for a half day tour. That is reasonable. A random person walking you 5 minutes to a shop is not a guide.',
        ],
      },
      {
        heading: 'The Souk Price Game',
        paragraphs: [
          'Nothing in a Moroccan souk has a price tag. That is by design. The starting price a vendor gives you is anywhere from 3x to 10x what they will actually accept.',
          'Real price examples so you know what things actually cost:',
          'A leather bag: 80 to 200 MAD (they will start at 500 to 800). Moroccan slippers (babouches): 40 to 80 MAD (they will start at 200 to 300). A small tagine pot (decorative): 30 to 60 MAD (they will start at 150 to 250). Argan oil (1 liter, cosmetic): 150 to 250 MAD (they will start at 500+). Spices (100g bag): 10 to 30 MAD (they will start at 80 to 150). A scarf or pashmina: 30 to 80 MAD (they will start at 200 to 400).',
          'How to handle it: Start at 30 to 40% of their asking price and negotiate from there. Walk away if they will not come down. Walking away is the strongest negotiation tool you have because 9 times out of 10 they will call you back with a lower number. Never feel bad about negotiating. It is expected. It is cultural. A vendor who does not want to negotiate will tell you.',
          'Pro tip: Buy from the smaller stalls deeper inside the souk, not the big shops on the main tourist paths. The deeper you go, the lower the starting prices.',
        ],
      },
      {
        heading: 'The Spice Shop "Tour"',
        paragraphs: [
          'Someone will offer to show you a spice shop or a "Berber pharmacy." The tour is actually a high-pressure sales pitch in a back room where they rub oils on your hands, pile up products, and then give you a bill for 500 to 2,000 MAD for items worth maybe 50 MAD total.',
          'How to handle it: If you want spices, buy them from the open-air vendors in the souk. You can see the product, negotiate openly, and walk away without pressure. Avoid any shop someone "guides" you to because that person is getting a commission and the prices are inflated to cover it.',
        ],
      },
      {
        heading: 'The Restaurant Menu Trick',
        paragraphs: [
          'Some restaurants near Jemaa el-Fna and other tourist spots have two prices. The menu price and the bill price. Your bill arrives 30 to 50% higher than what the menu said. They will add bread you did not order, water you did not ask for, or just inflate the numbers and hope you do not check.',
          'How to handle it: Always check the bill against the menu before paying. Take a photo of the menu when you sit down if it is a handwritten one. If the bill does not match, point it out calmly. They will correct it. Better yet, eat where locals eat. Ask your riad host where they personally go for lunch. Those places do not play games because they would lose their local customers.',
          'Restaurants locals actually eat at in Marrakech: Chez Lamine for tanjia (a Marrakech specialty most tourists never try). Snack stalls on Rue Bab Agnaou for 15 to 25 MAD meals. Cafe Clock in the Kasbah for a mix of Moroccan and modern. Al Bahriya for fresh fish if you want something different.',
        ],
      },
      {
        heading: 'The Taxi Without a Meter',
        paragraphs: [
          'Petit taxis (the small colored ones) in Marrakech are legally required to use the meter. Many drivers will refuse to turn it on and quote you a flat rate of 50 to 100 MAD for a ride that should cost 10 to 20 MAD on the meter.',
          'How to handle it: Before getting in, say "compteur" (meter) or point at the meter. If they refuse, close the door and wait for the next one. There is always another taxi in under a minute. The meter rate is about 1.50 MAD per kilometer plus a small starting fee. A ride across central Marrakech should rarely exceed 20 to 30 MAD on the meter.',
          'After midnight: Meters run at 50% higher (tarif de nuit). That is legal. A 20 MAD daytime ride becomes 30 MAD. Still nowhere near the 100 MAD they will try to charge without the meter.',
        ],
      },
      {
        heading: 'The Henna "Gift"',
        paragraphs: [
          'Women near Jemaa el-Fna will grab your hand and start applying henna before you agree to anything. Then they will demand 200 to 500 MAD. The henna is often low quality and uses black henna (which can cause chemical burns on sensitive skin).',
          'How to handle it: Pull your hand back immediately and say no. Do not feel guilty. This is not a cultural experience, it is a hustle. If you actually want henna, go to a salon or ask your riad to arrange someone. Real henna artists charge 50 to 150 MAD for a proper design with natural brown henna.',
        ],
      },
      {
        heading: 'The "Closed Mosque" Redirect',
        paragraphs: [
          'Someone near a mosque or palace will tell you "it\'s closed today" or "you need to enter from the other side" and then offer to lead you there. The destination is usually a carpet shop or a leather store where they get commission.',
          'How to handle it: Check the actual opening hours on Google or MoroccoMate before you go. Mosques in Morocco are closed to non-Muslims (except Hassan II in Casablanca), but palaces, museums, and gardens have fixed hours. If someone says a public attraction is closed, they are probably lying. Walk to the entrance yourself and check.',
        ],
      },
      {
        heading: 'Money and ATM Safety',
        paragraphs: [
          'Morocco uses the dirham (MAD). You cannot buy dirhams outside Morocco, so you will exchange when you arrive.',
          'Avoid: Exchanging money at the airport (worst rates). Exchanging at hotel front desks (second worst). Exchanging with random people on the street (illegal and you will get scammed or robbed).',
          'Do: Use ATMs from major banks (Attijariwafa, BMCE, Banque Populaire). They give the best exchange rate. Withdraw larger amounts to minimize the per-transaction fee. Keep small bills (20 and 50 MAD notes) for taxis and small purchases because vendors often "don\'t have change" for 200 MAD notes.',
        ],
      },
      {
        heading: 'The Bottom Line',
        paragraphs: [
          'Morocco is not a scam. Morocco is a country of incredibly warm, generous, funny people who will invite you into their home and feed you without expecting anything. The overwhelming majority of interactions you will have are genuine.',
          'The scams above exist in a very specific zone: the tourist corridors of the biggest cities. Once you step outside that zone, or once you know the playbook, they disappear entirely.',
          'Three rules that solve 90% of problems: (1) If you did not ask for it, you do not owe for it (unsolicited guides, henna, "gifts"). (2) The first price is never the real price (negotiate everything in the souk). (3) If someone is steering you somewhere, they are getting paid to do it (shop commissions).',
          'Know these three things and you will have the trip of a lifetime.',
        ],
      },
    ],
    cta: {
      label: 'Plan your trip on MoroccoMate',
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
