'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, MapPin, Star, BadgeCheck, Sun, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import { PLACES, mapsUrl, placeBestTime, cityDisplayName, type PlaceCategory } from '@/data/places';
import { useI18n, type MessageKey } from '@/lib/i18n';
import PartnerCta from '@/components/PartnerCta';
import BookButton from '@/components/BookButton';

const CITY_IDS = ['marrakesh', 'casablanca', 'rabat', 'tangier'] as const;

const CITY_VISUALS: Record<
  (typeof CITY_IDS)[number],
  { label: string; hub: string; image: string; focus: string; line: string }
> = {
  marrakesh: {
    label: 'Marrakech',
    hub: '/marrakech',
    image: '/images/places/jemaa-sunset.jpg',
    focus: 'center 40%',
    line: 'Medina, souks, rooftops',
  },
  casablanca: {
    label: 'Casablanca',
    hub: '/casablanca',
    image: '/images/places/hassan-ii.jpg',
    focus: 'center 35%',
    line: 'Corniche & nightlife',
  },
  rabat: {
    label: 'Rabat',
    hub: '/rabat',
    image: '/images/places/kasbah-oudayas.jpg',
    focus: 'center 40%',
    line: 'Kasbah & Atlantic calm',
  },
  tangier: {
    label: 'Tangier',
    hub: '/tangier',
    image: '/images/places/cafe-hafa.jpg',
    focus: 'center 35%',
    line: 'Strait views & jazz nights',
  },
};

export default function DiscoverPage() {
  const { t } = useI18n();
  const [category, setCategory] = useState<PlaceCategory | 'all'>('all');
  const [city, setCity] = useState('all');

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get('city');
    if (c && (CITY_IDS as readonly string[]).includes(c)) {
      setCity(c);
    }
  }, []);

  const filters: { id: PlaceCategory | 'all'; labelKey?: MessageKey; label?: string }[] = [
    { id: 'all', labelKey: 'all' },
    { id: 'restaurants', labelKey: 'restaurants' },
    { id: 'nightlife', labelKey: 'nightlife' },
    { id: 'shopping', labelKey: 'shopping' },
    { id: 'cafes', labelKey: 'cafes' },
    { id: 'monuments', labelKey: 'landmarks' },
    { id: 'experiences', label: 'Pools & days out' },
  ];

  const places = useMemo(() => {
    return PLACES.filter((p) => {
      const catOk = category === 'all' || p.category === category;
      const cityOk = city === 'all' || p.city === city;
      return catOk && cityOk;
    });
  }, [category, city]);

  const featured = useMemo(() => {
    const pool = places.filter((p) => p.badge === 'partner' || p.badge === 'verified');
    const ranked = (pool.length ? pool : places)
      .slice()
      .sort((a, b) => b.rating - a.rating);
    return ranked.slice(0, 3);
  }, [places]);

  const activeCity =
    city !== 'all' && city in CITY_VISUALS
      ? CITY_VISUALS[city as keyof typeof CITY_VISUALS]
      : null;

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Visual open — city as the first composition */}
      <section className="relative overflow-hidden border-b border-[var(--ink)]/10">
        <div className="absolute inset-0">
          <Image
            src={
              activeCity?.image ||
              '/images/places/marrakech-medina.jpg'
            }
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: activeCity?.focus || 'center 45%',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(243,239,232,0.97) 0%, rgba(243,239,232,0.72) 38%, rgba(12,18,24,0.45) 100%)',
            }}
          />
          <div className="hero-grain opacity-[0.05]" aria-hidden />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-12">
          <FadeIn>
            <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3 drop-shadow-sm">
              {t('discover_label')}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--ink)] leading-[1.05] mb-3 max-w-xl">
              {t('discover_title')}
            </h1>
            <p className="text-[var(--ink-soft)] text-lg max-w-xl leading-relaxed mb-8">
              {t('discover_sub')}
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-3">
              Pick a city
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {CITY_IDS.map((id) => {
                const c = CITY_VISUALS[id];
                const on = city === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCity(id)}
                    className={`group relative overflow-hidden rounded-md text-left aspect-[5/3] sm:aspect-[4/3] transition-transform duration-200 ${
                      on ? 'ring-2 ring-[var(--brand)] ring-offset-2 ring-offset-[var(--paper)]' : ''
                    }`}
                  >
                    <Image
                      src={c.image}
                      alt={c.label}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: c.focus }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 text-white">
                      <p className="font-display text-base sm:text-lg font-bold leading-none mb-1">
                        {c.label}
                      </p>
                      <p className="text-[11px] sm:text-xs text-white/75 leading-snug">{c.line}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <button
                type="button"
                onClick={() => setCity('all')}
                className={`font-semibold transition-colors ${
                  city === 'all'
                    ? 'text-[var(--brand)]'
                    : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                }`}
              >
                {t('all_cities')}
              </button>
              {CITY_IDS.map((id) => (
                <Link
                  key={id}
                  href={CITY_VISUALS[id].hub}
                  className="text-[var(--brand)] font-medium hover:underline"
                >
                  {CITY_VISUALS[id].label} guide
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <FadeIn className="mb-8">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              {t('filter')}
            </p>
            <p className="text-sm text-[var(--ink-soft)] tabular-nums">
              <span className="font-display font-bold text-[var(--brand)] text-base">
                {places.length}
              </span>{' '}
              {places.length === 1 ? 'spot' : 'spots'}
              {activeCity ? ` in ${activeCity.label}` : ''}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-[var(--ink)]/12 pb-3">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setCategory(f.id)}
                className={`text-sm font-semibold pb-2 border-b-2 -mb-[13px] transition-colors ${
                  category === f.id
                    ? 'border-[var(--brand)] text-[var(--brand)]'
                    : 'border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]'
                }`}
              >
                {f.labelKey ? t(f.labelKey) : f.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {featured.length > 0 && category === 'all' && (
          <FadeIn delay={0.05} className="mb-12">
            <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-4">
              Start here
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {featured.map((p) => (
                <a
                  key={`feat-${p.id}`}
                  href={mapsUrl(p.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-md aspect-[4/5] sm:aspect-[3/4] block"
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: p.imageFocus || 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--saffron)] mb-1">
                      {cityDisplayName(p.city)} · {p.category}
                    </p>
                    <p className="font-display text-lg font-bold leading-snug mb-1 group-hover:text-[var(--saffron)] transition-colors">
                      {p.name}
                    </p>
                    <p className="text-xs text-white/75 line-clamp-2">{p.neighborhood}</p>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        )}

        <div className="border-t border-[var(--ink)]/15">
          {places.map((p, i) => (
            <FadeIn key={p.id} delay={Math.min(i * 0.06, 0.36)}>
              <article className="group grid grid-cols-[6.5rem_1fr] sm:grid-cols-[9.5rem_1fr] gap-4 sm:gap-6 py-6 border-b border-[var(--ink)]/12">
                <Link
                  href={mapsUrl(p.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-zoom relative aspect-square sm:aspect-[4/5] overflow-hidden rounded-md bg-[var(--paper-deep)] shrink-0"
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 104px, 152px"
                    className="object-cover"
                    style={{ objectPosition: p.imageFocus || 'center' }}
                  />
                </Link>

                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 min-w-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                        {p.name}
                      </h2>
                      <span className="text-xs uppercase tracking-wider text-[var(--ink-soft)]/70">
                        {p.category}
                      </span>
                      {p.badge === 'partner' && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">
                          <BadgeCheck className="w-3 h-3" /> Partner
                        </span>
                      )}
                      {p.badge === 'verified' && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--zellige)]">
                          <BadgeCheck className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--ink-soft)] mb-1.5 flex items-center gap-1 capitalize">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {cityDisplayName(p.city)} · {p.neighborhood}
                    </p>
                    <p className="text-xs text-[var(--saffron)] font-medium mb-2 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5" />
                      {placeBestTime(p)}
                    </p>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-sm text-[var(--saffron)]">
                      <Star className="w-3.5 h-3.5 fill-[var(--saffron)]" />
                      {p.rating}
                    </span>
                    <span className="text-sm font-medium text-[var(--ink-soft)]">
                      {p.priceRange}
                    </span>
                    <BookButton
                      compact
                      place={{
                        placeId: p.id,
                        placeName: p.name,
                        city: cityDisplayName(p.city),
                        badge: p.badge,
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand)] hover:underline"
                    />
                    <a
                      href={mapsUrl(p.mapsQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)]"
                    >
                      {t('google_maps')} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {places.length === 0 && (
          <p className="py-12 text-[var(--ink-soft)] text-center">
            No places match these filters.
          </p>
        )}

        <FadeIn className="mt-14 space-y-10">
          <PartnerCta />
          <div className="border-t border-[var(--ink)]/12 pt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div>
              <p className="text-[var(--ink-soft)] mb-1">{t('want_plan')}</p>
              <p className="font-display text-xl font-bold text-[var(--ink)]">
                Turn these spots into days
              </p>
            </div>
            <Link href="/plan" className="btn-primary inline-flex items-center gap-2 shrink-0">
              {t('build_itinerary')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
