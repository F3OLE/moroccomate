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
import { FadeIn } from '@/components/FadeIn';
import HoverImageReveal from '@/components/HoverImageReveal';
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
    <div className="min-h-screen bg-[var(--paper)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative min-h-[48svh] sm:min-h-[52svh] -mt-14 sm:-mt-16 flex items-end overflow-hidden">
        <Image
          src={hub.heroImage}
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,18,24,0.92)] via-[rgba(12,18,24,0.5)] to-[rgba(12,18,24,0.2)]" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-10 pt-28">
          <p className="text-[var(--saffron)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
            City guide
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-3">
            {hub.name}
          </h1>
          <p className="text-white/85 text-lg sm:text-xl max-w-2xl mb-8 leading-relaxed">
            {hub.tagline}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Link href="/plan" className="btn-primary inline-flex items-center gap-2">
              Plan {hub.name}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/discover?city=${hub.placeCity}`}
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Browse places
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <FadeIn>
          <p className="text-[var(--ink-soft)] text-lg max-w-2xl mb-14 leading-relaxed">
            {hub.description}
          </p>
        </FadeIn>

        <section className="mb-16">
          <FadeIn className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-2">
                Places
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ink)]">
                Places in {hub.name}
              </h2>
              <p className="text-[var(--ink-soft)] mt-2 max-w-lg">
                Real spots with Maps links. Not a filler top-20 list.
              </p>
            </div>
            <Link
              href={`/discover?city=${hub.placeCity}`}
              className="inline-flex items-center gap-2 text-[var(--brand)] font-semibold"
            >
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>

          <div className="border-t border-[var(--ink)]/15">
            {places.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.1}>
                <HoverImageReveal
                  src={p.image}
                  alt={p.name}
                  tone="light"
                  focus={p.imageFocus || 'center center'}
                  className="min-h-[7.5rem] py-6 border-b border-[var(--ink)]/12 -mx-1 sm:-mx-2"
                >
                  <article className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                        <h3 className="font-display text-xl font-bold text-[var(--ink)] group-hover/hover-img:text-[var(--brand)] transition-colors">
                          {p.name}
                        </h3>
                        <span className="text-xs uppercase tracking-wider text-[var(--ink-soft)]/70">
                          {p.category}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--ink-soft)] mb-2 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {p.neighborhood}
                      </p>
                      <p className="text-sm text-[var(--ink-soft)] leading-relaxed max-w-2xl line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                      <span className="inline-flex items-center gap-1 text-sm text-[var(--saffron)]">
                        <Star className="w-3.5 h-3.5 fill-[var(--saffron)]" />
                        {p.rating}
                      </span>
                      <a
                        href={mapsUrl(p.mapsQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)]"
                      >
                        Open in Maps <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                </HoverImageReveal>
              </FadeIn>
            ))}
          </div>
        </section>

        {experiences.length > 0 && (
          <section className="mb-16">
            <FadeIn className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-2">
                  Experiences
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ink)]">
                  Experiences near {hub.name}
                </h2>
                <p className="text-[var(--ink-soft)] mt-2 max-w-lg">
                  Quads, flights, hammams, and more you can book via MoroccoMate.
                </p>
              </div>
              <Link
                href="/experiences"
                className="inline-flex items-center gap-2 text-[var(--brand)] font-semibold"
              >
                All experiences <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
            <div className="border-t border-[var(--ink)]/15">
              {experiences.map((xp, i) => (
                <FadeIn key={xp.id} delay={i * 0.1}>
                  <HoverImageReveal
                    src={xp.image}
                    alt={xp.title}
                    tone="light"
                    focus={xp.imageFocus || 'center center'}
                    className="min-h-[7.5rem] py-6 border-b border-[var(--ink)]/12 -mx-1 sm:-mx-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wider text-[var(--zellige)] mb-1">
                          {xp.partnerType}
                        </p>
                        <h3 className="font-display text-xl font-bold text-[var(--ink)] mb-1 group-hover/hover-img:text-[var(--brand)] transition-colors">
                          {xp.title}
                        </h3>
                        <p className="text-sm text-[var(--ink-soft)] mb-2">
                          {xp.location} · {xp.duration}
                        </p>
                        <p className="text-sm text-[var(--ink-soft)] line-clamp-2 max-w-xl">
                          {xp.description}
                        </p>
                      </div>
                      <p className="font-display text-lg font-bold text-[var(--brand)] shrink-0">
                        {xp.price}
                      </p>
                    </div>
                  </HoverImageReveal>
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        <FadeIn>
          <section className="mb-16 border-y border-[var(--ink)]/15 py-10">
            <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-2">
              Build your days
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ink)] mb-3">
              Plan a {hub.name} itinerary
            </h2>
            <p className="text-[var(--ink-soft)] max-w-xl mb-6 leading-relaxed">
              Pick dates and interests. Get a day-by-day plan with real venues and Maps
              links.
            </p>
            <Link href="/plan" className="btn-primary inline-flex items-center gap-2">
              Plan {hub.name} <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </FadeIn>

        {posts.length > 0 && (
          <FadeIn>
            <section className="mb-16">
              <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">
                Guides for your trip
              </h2>
              <div className="border-t border-[var(--ink)]/15">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block py-5 border-b border-[var(--ink)]/12"
                  >
                    <h3 className="font-display text-lg font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--ink-soft)] mt-1">{post.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          </FadeIn>
        )}

        <FadeIn>
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-4">
              Other cities
            </p>
            <div className="border-t border-[var(--ink)]/15">
              {otherCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-4 border-b border-[var(--ink)]/12"
                >
                  <span className="font-display text-xl font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                    {c.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[var(--brand)] shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
