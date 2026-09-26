export type BlogImage = {
  src: string;
  alt: string;
  focus?: string;
  caption?: string;
  credit?: string;
};

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  image?: BlogImage;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  city?: string;
  tags: string[];
  cover: BlogImage;
  /** Plain sections for the article body */
  sections: BlogSection[];
  cta?: { label: string; href: string };
};

const img = (file: string) => `/images/places/${file}`;
const blogImg = (file: string) => `/images/blog/${file}`;

function wordCount(post: Pick<BlogPost, 'title' | 'description' | 'sections'>) {
  const body = post.sections
    .flatMap((s) => [s.heading || '', ...s.paragraphs])
    .join(' ');
  return `${post.title} ${post.description} ${body}`
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function postReadMinutes(post: BlogPost) {
  return Math.max(3, Math.round(wordCount(post) / 220));
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'marrakech-short-film-festival-september-2026',
    title: 'Marrakech Short Film Festival Week: What to Do Between Screenings',
    description:
      'The 6th Marrakech Short Film Festival runs 25–30 September 2026. Here is how to pair cinema days with medina walks, Majorelle mornings, and soft autumn nights — without packing your calendar.',
    publishedAt: '2026-09-25',
    updatedAt: '2026-09-25',
    city: 'Marrakech',
    tags: ['marrakech', 'events', 'festival', 'autumn', 'film'],
    cover: {
      src: img('jemaa-sunset.jpg'),
      alt: 'Jemaa el-Fnaa square at golden hour in Marrakech',
      focus: 'center 40%',
      caption: 'Jemaa at blue hour — perfect after an afternoon screening.',
    },
    sections: [
      {
        paragraphs: [
          'If you are in Marrakech this week, the city has a quiet cultural pulse under the usual medina buzz: the 6th Marrakech Short Film Festival runs from 25 to 30 September 2026. Shorts travel easier than feature premieres — you can catch two programs before dinner and still have a rooftop sunset.',
          'September is also one of the best travel months here. Heat softens, nights stay warm, and hotel rates are kinder than peak winter film week in November. Use festival days as anchors, not as a full-time job.',
          'This year Malta is the guest country. Screenings and talks are spread across the Palais Badii, Cyber Parc Moulay Abdessalam, the Institut français, The Folk, Meydene, and Atlantis Studios. Passes run from 50 to 600 DH, and the Bridges of Reality and Low Budget Film programs are free to enter.',
        ],
        image: {
          src: blogImg('el-badi-palace.jpg'),
          alt: 'The ruined walls of El Badi Palace reflected in its courtyard pool, Marrakech',
          focus: 'center 45%',
          caption: 'Palais Badii, one of this year’s festival venues. Worth a visit even without a ticket.',
          credit: 'Jakub Hałun, CC BY 4.0',
        },
      },
      {
        heading: 'Build a festival day that still feels like Marrakech',
        paragraphs: [
          'Morning: walk Bahia Palace or a calmer souk lane before 11:00. Buy nothing yet — just map the streets.',
          'Midday: lunch in a courtyard (Le Jardin energy) or a spice-square café, then a short rest. Short festivals reward people who are not fried by 16:00.',
          'Afternoon or early evening: your screening block. Travel light. Bring a scarf for cold cinema AC.',
          'Night: Jemaa from a rooftop, or Hivernage if you want dinner-show energy. Do not try to “do nightlife” every festival night — two strong evenings beat five forgettable ones.',
        ],
        image: {
          src: img('bahia-palace.jpg'),
          alt: 'Courtyard detail at Bahia Palace, Marrakech',
          focus: 'center 35%',
          caption: 'Bahia early — cooler light, fewer tour groups.',
        },
      },
      {
        heading: 'Also on the calendar this week',
        paragraphs: [
          '27 September is World Tourism Day, with city programs around sustainable travel. Easy add-on if you want a talk or neighborhood walk between films.',
          'Through 29 September, the Yves Saint Laurent Museum is running “Yves Saint Laurent et ses chiens.” Pair it with Jardin Majorelle next door — classic, photogenic, and a soft counterpoint to cinema seats.',
          'Looking ahead: Rencontres de la Photographie lands late October, and the Marrakech International Film Festival returns 20–28 November. If shorts this week feel good, November is the red-carpet sequel.',
        ],
        image: {
          src: img('jardin-majorelle.jpg'),
          alt: 'Blue walls and plants at Jardin Majorelle',
          focus: 'center 40%',
          caption: 'Majorelle + YSL on a non-screening morning.',
        },
      },
      {
        heading: 'Where to stay in the rhythm',
        paragraphs: [
          'Medina riads keep you walkable to Jemaa and many cultural venues. Guéliz / Hivernage is easier for taxis, cafés, and late dinners. If you are flying out of CMN after the festival, leave one buffer morning — September traffic and festival crowds both love the same hours.',
          'Want a day-by-day skeleton for your dates? Generate a Marrakech plan, then swap two afternoon slots for screenings. MoroccoMate is built for that kind of edit.',
        ],
        image: {
          src: img('marrakech-medina.jpg'),
          alt: 'Marrakech medina lane with a horse cart and warm light',
          focus: 'center 45%',
          caption: 'Keep mornings free for the medina before afternoon screenings.',
        },
      },
    ],
    cta: {
      label: 'Plan Marrakech around the festival',
      href: '/plan',
    },
  },
  {
    slug: 'tanjazz-tangier-2026-weekend-guide',
    title: 'Tanjazz Just Lit Up Tangier — A Weekend Guide to the Strait City',
    description:
      'Tanjazz’s 23rd edition ran 18–20 September 2026 across Tangier. Whether you caught the sets or you are arriving on the afterglow, here is how to spend three days between Café Hafa, the kasbah, Cap Spartel, and the beach.',
    publishedAt: '2026-09-24',
    updatedAt: '2026-09-24',
    city: 'Tangier',
    tags: ['tangier', 'events', 'tanjazz', 'jazz', 'weekend'],
    cover: {
      src: blogImg('tanjazz-stage.jpg'),
      alt: 'Crowd facing the red-lit Tanjazz main stage at night in Tangier',
      focus: 'center 40%',
      caption: 'The Tanjazz main stage on a festival night in Tangier.',
    },
    sections: [
      {
        paragraphs: [
          'Tanjazz returned to Tangier from 18 to 20 September 2026 after skipping 2025 to rebuild partnerships. Outdoor stages and intimate rooms, jazz meeting Moroccan and world sounds — the festival is how the city introduces itself: open, coastal, a little cinematic.',
          'If you were here for the weekend, keep the playlist energy but slow the pace. If you missed it, Tangier still rewards the same three-day skeleton: one medina day, one Atlantic day, one “do nothing on a terrace” day.',
        ],
        image: {
          src: img('tangier-kasbah.jpg'),
          alt: 'The old kasbah walls of Tangier with white houses above',
          focus: 'center 55%',
          caption: 'The kasbah walls. The lanes up top are quieter and cooler after a late concert.',
          credit: 'Travel4Brews, CC BY 2.0',
        },
      },
      {
        heading: 'Day plan when the city is still humming',
        paragraphs: [
          'Morning: Petit Socco coffee, then climb toward the kasbah for views and empty alleys.',
          'Late morning: Café Hafa. Order mint tea. Watch ferries stitch Spain to Africa. Stay longer than you planned.',
          'Afternoon: Cap Spartel and the caves if you want Atlantic drama, or Tangier beach if you want sand and soft light.',
          'Evening: Grand Socco energy, a medina dinner, and — if Cinema Rif has something on — a film that fits the mood. Tangier loves a night that ends with conversation, not a checklist.',
        ],
        image: {
          src: img('cap-spartel.jpg'),
          alt: 'Cap Spartel lighthouse on the Atlantic coast near Tangier',
          focus: 'center 45%',
          caption: 'Cap Spartel for Atlantic wind after a late night.',
        },
      },
      {
        heading: 'Why Tanjazz matters for travelers',
        paragraphs: [
          'In 2024 the festival drew tens of thousands of visitors. The 2026 edition put names like Dee Dee Bridgewater, Diego El Cigala, Rodrigo y Gabriela, and Buena Vista All Stars on the Tangier stage — the kind of lineup that makes a city feel international without losing its streets.',
          'For travelers, festivals are an excuse to book the shoulder season: September light on the Strait is sharp, hotels are available, and you get culture without midsummer heat.',
          'Check tanjazz.org and WeBook for future editions. Tangier rewards people who leave one evening empty — that is usually when the best set finds you.',
        ],
        image: {
          src: img('petit-socco.jpg'),
          alt: 'Petit Socco square in Tangier medina',
          focus: 'center 50%',
          caption: 'Petit Socco between sets — people-watching is half the festival.',
        },
      },
      {
        heading: 'Turn the weekend into a plan',
        paragraphs: [
          'Open Discover filtered to Tangier, pin Café Hafa, Cap Spartel, and a medina dinner, then use Plan a trip to lock dates. If you are combining Tangier with Chefchaouen or a southbound train to Casa, leave a buffer morning — the Strait has a way of making you late on purpose.',
        ],
        image: {
          src: img('cafe-hafa.jpg'),
          alt: 'Café Hafa terrace overlooking the Strait of Gibraltar',
          focus: 'center 35%',
          caption: 'Café Hafa, Tangier’s long balcony over the Strait.',
        },
      },
    ],
    cta: {
      label: 'Build a Tangier weekend',
      href: '/plan',
    },
  },
  {
    slug: 'how-to-avoid-scams-in-morocco',
    title: "How to Avoid Scams in Morocco: A Local's Honest Guide (2027)",
    description:
      'A Marrakech medina local\'s cheat sheet: fake guides, souk prices, taxis, henna hustles, restaurant bill tricks, and real MAD price ranges so you can enjoy Morocco without getting ripped off.',
    publishedAt: '2026-09-22',
    updatedAt: '2026-09-22',
    city: 'Morocco',
    tags: ['safety', 'tips', 'marrakech', 'first-timers', 'scams'],
    cover: {
      src: img('souk-semmarine.jpg'),
      alt: 'Covered souk lane in Marrakech with lanterns and shops',
      focus: 'center 40%',
      caption: 'Souk Semmarine — beautiful, busy, and full of negotiation theater.',
    },
    sections: [
      {
        paragraphs: [
          'Morocco is one of the safest and most rewarding countries you will ever visit. But like any major tourist destination, there are people who make a living off visitors who do not know the rules. This is not a scare piece. It is a cheat sheet from someone who was born and raised in the Marrakech medina so you can relax and enjoy your trip without getting ripped off.',
        ],
        image: {
          src: img('ensemble-artisanale.jpg'),
          alt: 'Artisan crafts display in Marrakech',
          focus: 'center 45%',
          caption: 'Fixed-price artisan shops beat high-pressure “guided” tours.',
        },
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
        image: {
          src: '/images/culture/tagine-pots.jpg',
          alt: 'Stack of painted tagine pots for sale in a souk',
          focus: 'center 50%',
          caption: 'A small decorative tagine should cost 30 to 60 MAD. Start low.',
        },
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
        heading: 'Bracelets, Snake Charmers and Monkeys',
        paragraphs: [
          'Same playbook as the henna: someone ties a "free" friendship bracelet on your wrist, then asks for money. Keep your hands to yourself and keep walking.',
          'In Jemaa el-Fna, every photo of a snake charmer, monkey handler, or performer costs money, even a quick one from a distance. If you want the shot, agree on the price first (10 to 20 MAD is fair). If you do not, keep the phone down.',
          'If someone will not leave you alone, mention the tourist police. They patrol the main square and the medina, and the word alone usually ends it.',
        ],
      },
      {
        heading: 'What Things Actually Cost',
        paragraphs: [
          'Fresh orange juice: 8 MAD at a local shop, around 20 MAD on the square. A large bottle of water: about 6 MAD. Hot bread from a neighborhood ferran (bakery): 3 MAD. A mixed-meat sandwich from a souk stall: around 15 MAD, so pick the busiest one.',
          'None of these need haggling. Branded stores in Gueliz have fixed prices too. Haggling is for the souks.',
          'Cash matters: ATMs charge about 35 to 45 MAD per withdrawal and many small places only take cash, so take out two days of spending at a time.',
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
    cover: {
      src: img('agafay-pool-camp.jpg'),
      alt: 'Camel riders crossing the stony Agafay desert near Marrakech',
      focus: 'center 40%',
      caption: 'Agafay, the 7-day plan’s best add-on.',
    },
    sections: [
      {
        paragraphs: [
          'Most “Morocco in 5 days” guides try to cover Marrakech, Fes, the desert, and the coast. That is a lot of transit for little enjoyment.',
          'These plans stay realistic: pick a base city, do day trips, and leave room for food and evenings. Use our planner to customize dates and interests.',
        ],
        image: {
          src: img('nomad-marrakech.jpg'),
          alt: 'Baskets of spices and dried herbs in a Marrakech souk',
          focus: 'center 45%',
          caption: 'Leave room to wander. The souks and long dinners are half the trip.',
        },
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
        image: {
          src: img('ourika-river-day.jpg'),
          alt: 'Ourika Valley river cafés in the Atlas foothills',
          focus: 'center 50%',
          caption: 'Ourika for cooler air when the medina feels loud.',
        },
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
        image: {
          src: img('hassan-ii.jpg'),
          alt: 'Hassan II Mosque on the Casablanca waterfront',
          focus: 'center 35%',
          caption: 'Hassan II Mosque — start the Casa base here.',
        },
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
    cover: {
      src: img('mamounia-pool.jpg'),
      alt: 'Garden pool at a Marrakech palace hotel',
      focus: 'center 45%',
      caption: 'Pool days are how Marrakech does “beach.”',
    },
    sections: [
      {
        paragraphs: [
          'Marrakech rewards slow mornings and intentional evenings. You do not need to “see everything.” Pick a few anchors and leave gaps for mint tea and people-watching.',
          'Here is a practical mix of classics and places travelers actually enjoy.',
        ],
        image: {
          src: img('le-jardin.jpg'),
          alt: 'Leafy courtyard restaurant in Marrakech medina',
          focus: 'center center',
          caption: 'Courtyard lunches beat square-edge tourist menus.',
        },
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
        image: {
          src: img('cafe-des-epices.jpg'),
          alt: 'Café des Épices overlooking the spice square',
          focus: 'center 22%',
          caption: 'Spice-square cafés for juice and people-watching.',
        },
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

export function sortedPosts() {
  return [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
