'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, MapPin, Star, BadgeCheck, Sun } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import HoverImageReveal from '@/components/HoverImageReveal';
import { PLACES, mapsUrl, placeBestTime, cityDisplayName, type PlaceCategory } from '@/data/places';
import { useI18n, type MessageKey } from '@/lib/i18n';
import PartnerCta from '@/components/PartnerCta';
import BookButton from '@/components/BookButton';

const CITY_IDS = ['marrakesh', 'casablanca', 'rabat', 'tangier'] as const;

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

  const cities = [
    { id: 'all', labelKey: 'all_cities' as MessageKey },
    { id: 'marrakesh', label: 'Marrakech', hub: '/marrakech' },
    { id: 'casablanca', label: 'Casablanca', hub: '/casablanca' },
    { id: 'rabat', label: 'Rabat', hub: '/rabat' },
    { id: 'tangier', label: 'Tangier', hub: '/tangier' },
  ];

  const places = useMemo(() => {
    return PLACES.filter((p) => {
      const catOk = category === 'all' || p.category === category;
      const cityOk = city === 'all' || p.city === city;
      return catOk && cityOk;
    });
  }, [category, city]);

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <FadeIn className="mb-10 md:mb-12">
          <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
            {t('discover_label')}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--ink)] leading-[1.1] mb-4">
            {t('discover_title')}
          </h1>
          <p className="text-[var(--ink-soft)] text-lg max-w-xl leading-relaxed mb-8">
            {t('discover_sub')}
          </p>
          <PartnerCta />
        </FadeIn>

        <FadeIn delay={0.05} className="mb-10 space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-3">
              City
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-[var(--ink)]/12 pb-3">
              {cities.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCity(c.id)}
                  className={`text-sm font-semibold pb-2 border-b-2 -mb-[13px] transition-colors ${
                    city === c.id
                      ? 'border-[var(--brand)] text-[var(--brand)]'
                      : 'border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]'
                  }`}
                >
                  {'labelKey' in c && c.labelKey ? t(c.labelKey) : c.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mt-4 text-sm text-[var(--ink-soft)]">
              <span>City guides</span>
              {cities
                .filter((c) => 'hub' in c && c.hub)
                .map((c) => (
                  <Link
                    key={c.hub}
                    href={c.hub!}
                    className="text-[var(--brand)] font-medium hover:underline"
                  >
                    {c.label}
                  </Link>
                ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-3">
              {t('filter')}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setCategory(f.id)}
                  className={`text-sm font-semibold transition-colors ${
                    category === f.id
                      ? 'text-[var(--brand)]'
                      : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                  }`}
                >
                  {f.labelKey ? t(f.labelKey) : f.label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="border-t border-[var(--ink)]/15">
          {places.map((p, i) => (
            <FadeIn key={p.id} delay={Math.min(i * 0.1, 0.5)}>
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
                      <h2 className="font-display text-xl font-bold text-[var(--ink)] group-hover/hover-img:text-[var(--brand)] transition-colors">
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
                      {p.city === 'marrakesh'
                        ? 'Marrakech'
                        : p.city === 'tangier'
                          ? 'Tangier'
                          : p.city.charAt(0).toUpperCase() + p.city.slice(1)}{' '}
                      · {p.neighborhood}
                    </p>
                    <p className="text-xs text-[var(--saffron)] font-medium mb-2 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5" />
                      {placeBestTime(p)}
                    </p>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed max-w-2xl line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                  <div className="flex sm:flex-col items-start sm:items-end gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-sm text-[var(--saffron)]">
                      <Star className="w-3.5 h-3.5 fill-[var(--saffron)]" />
                      {p.rating}
                    </span>
                    <span className="text-sm font-medium text-[var(--ink-soft)]">{p.priceRange}</span>
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
                </article>
              </HoverImageReveal>
            </FadeIn>
          ))}
        </div>

        {places.length === 0 && (
          <p className="py-12 text-[var(--ink-soft)] text-center">No places match these filters.</p>
        )}

        <FadeIn className="mt-14 space-y-10">
          <PartnerCta />
          <div className="border-t border-[var(--ink)]/12 pt-10">
            <p className="text-[var(--ink-soft)] mb-4">{t('want_plan')}</p>
            <Link href="/plan" className="btn-primary inline-flex">
              {t('build_itinerary')}
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
