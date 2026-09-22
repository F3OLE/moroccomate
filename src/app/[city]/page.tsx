import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ExternalLink, MapPin, Star } from 'lucide-react';
import {
  CITY_HUBS,
  blogForHub,
  experiencesForHub,
  getAllCitySlugs,
  getCityHub,
  placesForHub,
} from '@/data/cities';
import { mapsUrl } from '@/data/places';
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo';

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const hub = getCityHub(city);
  if (!hub) return { title: 'City not found' };

  return buildMetadata({
    title: `${hub.name} travel guide`,
    description: hub.description,
    path: `/${hub.slug}`,
    keywords: hub.keywords,
  });
}

export default async function CityHubPage({ params }: Props) {
  const { city } = await params;
  const hub = getCityHub(city);
  if (!hub) notFound();

  const places = placesForHub(hub, 6);
  const experiences = experiencesForHub(hub, 3);
  const posts = blogForHub(hub, 2);
  const otherCities = CITY_HUBS.filter((c) => c.slug !== hub.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: hub.name,
    description: hub.description,
    url: absoluteUrl(`/${hub.slug}`),
    tourBookingPage: absoluteUrl('/plan'),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
  };

  return (
    <div className="min-h-screen bg-pattern">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative min-h-[42vh] sm:min-h-[48vh] flex items-end overflow-hidden">
        <Image
          src={hub.heroImage}
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2632] via-[#1a2632]/55 to-black/25" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-28">
          <p className="text-[#E1B168] text-sm font-bold uppercase tracking-wider mb-2">
            City guide
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3">
            {hub.name}
          </h1>
          <p className="text-white/85 text-lg sm:text-xl max-w-2xl mb-6">
            {hub.tagline}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plan"
              className="btn-primary inline-flex items-center gap-2"
            >
              Plan {hub.name}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/discover?city=${hub.placeCity}`}
              className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl"
            >
              Browse places
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <p className="text-gray-600 text-lg max-w-3xl mb-12 leading-relaxed">
          {hub.description}
        </p>

        <section className="mb-14">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C3E50]">
                Places in {hub.name}
              </h2>
              <p className="text-gray-600 mt-1">
                Real spots with Maps links. Not a filler top-20 list.
              </p>
            </div>
            <Link
              href={`/discover?city=${hub.placeCity}`}
              className="text-[#D93D3D] font-semibold inline-flex items-center gap-1"
            >
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((p) => (
              <article
                key={p.id}
                className="card overflow-hidden flex flex-col"
              >
                <div className="relative h-44 -mx-6 -mt-6 mb-4">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-[#2C3E50] text-lg">{p.name}</h3>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-600 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-[#E1B168] text-[#E1B168]" />
                    {p.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {p.neighborhood}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                  {p.description}
                </p>
                <a
                  href={mapsUrl(p.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D93D3D]"
                >
                  Open in Maps <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </article>
            ))}
          </div>
        </section>

        {experiences.length > 0 && (
          <section className="mb-14">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2C3E50]">
                  Experiences near {hub.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  Quads, flights, hammams, and more you can book via MoroccoMate.
                </p>
              </div>
              <Link
                href="/experiences"
                className="text-[#D93D3D] font-semibold inline-flex items-center gap-1"
              >
                All experiences <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((xp) => (
                <article key={xp.id} className="card">
                  <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
                    <Image
                      src={xp.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="font-bold text-[#2C3E50] text-lg mb-1">
                    {xp.title}
                  </h3>
                  <p className="text-sm text-[#D93D3D] font-medium mb-2">
                    {xp.price} · {xp.duration}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {xp.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="mb-14 rounded-2xl bg-[#2C3E50] text-white p-8 sm:p-10 text-center">
          <p className="text-[#E1B168] text-sm font-bold uppercase tracking-wider mb-2">
            Build your days
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Plan a {hub.name} itinerary
          </h2>
          <p className="text-white/75 max-w-xl mx-auto mb-6">
            Pick dates and interests. Get a day-by-day plan with real venues and
            Maps links.
          </p>
          <Link
            href="/plan"
            className="btn-primary inline-flex items-center gap-2"
          >
            Plan {hub.name} <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {posts.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">
              Guides for your trip
            </h2>
            <ul className="space-y-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-semibold text-[#2C3E50] hover:text-[#D93D3D]"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {post.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
            Other cities
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-[#2C3E50] font-medium hover:border-[#D93D3D] hover:text-[#D93D3D]"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
