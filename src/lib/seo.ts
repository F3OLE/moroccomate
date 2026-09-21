import type { Metadata } from 'next';
import { socialSameAs } from '@/lib/social';

/** Canonical site URL. Override with NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://moroccomate.com'
).replace(/\/$/, '');

export const SITE_NAME = 'MoroccoMate';

export const SITE_TAGLINE = 'Your Journey Through Morocco';

export const DEFAULT_DESCRIPTION =
  'MoroccoMate is your Morocco travel companion: discover restaurants, nightlife, souks and landmarks in Marrakech, Casablanca, Rabat and Tangier. Book quads, paragliding, desert camps and hammams. Plan day-by-day trips with AI.';

/** Search phrases people use for brand + travel intent. */
export const SITE_KEYWORDS = [
  'MoroccoMate',
  'Morocco Mate',
  'moroccomate',
  'Morocco travel',
  'Morocco trip planner',
  'Morocco itinerary',
  'visit Morocco',
  'Marrakech guide',
  'Casablanca restaurants',
  'Rabat nightlife',
  'Tangier travel',
  'Morocco restaurants',
  'Morocco nightlife',
  'Morocco shopping',
  'souks Morocco',
  'quad bike Marrakech',
  'paragliding Morocco',
  'desert camp Morocco',
  'hot air balloon Marrakech',
  'hammam Marrakech',
  'things to do in Morocco',
  'Morocco experiences',
  'plan trip to Morocco',
  'AI travel planner Morocco',
  'Morocco travel app',
  'best places Morocco',
];

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle =
    title === SITE_NAME || title.startsWith(`${SITE_NAME} `)
      ? title
      : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords: [...new Set([...SITE_KEYWORDS, ...keywords])],
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: absoluteUrl('/images/icon-512.png'),
          width: 512,
          height: 512,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteUrl('/images/icon-512.png')],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/images/icon-512.png'),
    description: DEFAULT_DESCRIPTION,
    sameAs: socialSameAs(),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: ['Morocco Mate', 'moroccomate'],
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: ['en', 'fr', 'es'],
  };
}

export function travelAppJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Web',
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}
