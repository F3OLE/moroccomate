'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Check, ArrowRight, LayoutList, LayoutGrid } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import HoverImageReveal from '@/components/HoverImageReveal';
import { EXPERIENCES, mapsUrl } from '@/data/places';
import { useI18n } from '@/lib/i18n';

type ViewMode = 'list' | 'grid';

const CITY_OPTIONS = [
  { id: 'all', label: 'All cities' },
  ...Array.from(new Set(EXPERIENCES.map((xp) => xp.city))).map((city) => ({
    id: city.toLowerCase().replace(/\s+/g, '-'),
    label: city,
  })),
];

function cityMatches(xpCity: string, filterId: string) {
  if (filterId === 'all') return true;
  return xpCity.toLowerCase().replace(/\s+/g, '-') === filterId;
}

function parseView(raw: string | null): ViewMode | null {
  if (raw === 'grid' || raw === 'square') return 'grid';
  if (raw === 'list') return 'list';
  return null;
}

function parseCity(raw: string | null): string | null {
  if (!raw) return null;
  const key = raw.toLowerCase().replace(/\s+/g, '-');
  const match = CITY_OPTIONS.find(
    (opt) =>
      opt.id === key ||
      opt.label.toLowerCase() === raw.toLowerCase() ||
      (key.includes('marr') && opt.id.includes('marr'))
  );
  return match?.id ?? null;
}

function ExperiencesContent() {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const appliedLocalPref = useRef(false);

  const urlCity = parseCity(searchParams.get('city')) || 'all';
  const urlView = parseView(searchParams.get('view'));

  const [city, setCity] = useState(urlCity);
  const [view, setView] = useState<ViewMode>(urlView || 'list');

  useEffect(() => {
    setCity(urlCity);
    if (urlView) {
      setView(urlView);
      return;
    }
    if (!appliedLocalPref.current) {
      appliedLocalPref.current = true;
      try {
        const saved = localStorage.getItem('mm_xp_view');
        if (saved === 'grid' || saved === 'list') {
          setView(saved);
          return;
        }
      } catch {
        /* ignore */
      }
      setView('list');
    }
  }, [urlCity, urlView]);

  const syncUrl = (nextCity: string, nextView: ViewMode) => {
    const params = new URLSearchParams();
    if (nextCity !== 'all') params.set('city', nextCity);
    if (nextView !== 'list') params.set('view', nextView);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const setCityFilter = (id: string) => {
    setCity(id);
    syncUrl(id, view);
  };

  const setViewPersist = (mode: ViewMode) => {
    setView(mode);
    syncUrl(city, mode);
    try {
      localStorage.setItem('mm_xp_view', mode);
    } catch {
      /* ignore */
    }
  };

  const experiences = useMemo(
    () => EXPERIENCES.filter((xp) => cityMatches(xp.city, city)),
    [city]
  );

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div
        className={`mx-auto px-4 sm:px-6 py-12 sm:py-16 ${
          view === 'grid' ? 'max-w-6xl' : 'max-w-4xl'
        }`}
      >
        <FadeIn className="mb-8 md:mb-10 max-w-2xl">
          <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
            {t('xp_page_label')}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--ink)] leading-[1.1] mb-4">
            {t('xp_page_title')}
          </h1>
          <p className="text-[var(--ink-soft)] text-lg leading-relaxed">{t('xp_page_sub')}</p>
        </FadeIn>

        <FadeIn delay={0.05} className="relative z-10 mb-8 space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-3">
              City
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-[var(--ink)]/12 pb-3">
              {CITY_OPTIONS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  data-testid={`xp-city-${c.id}`}
                  onClick={() => setCityFilter(c.id)}
                  className={`text-sm font-semibold py-2 border-b-2 -mb-[13px] transition-colors ${
                    city === c.id
                      ? 'border-[var(--brand)] text-[var(--brand)]'
                      : 'border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]'
                  }`}
                >
                  {c.id === 'all' ? t('all_cities') : c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              How do you want to see experiences?
            </p>
            <div
              className="inline-flex items-center gap-1 border-b border-[var(--ink)]/12"
              role="group"
              aria-label="Experience layout"
            >
              <button
                type="button"
                data-testid="xp-view-list"
                onClick={() => setViewPersist('list')}
                aria-pressed={view === 'list'}
                className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-2.5 border-b-2 -mb-px transition-colors ${
                  view === 'list'
                    ? 'border-[var(--brand)] text-[var(--brand)]'
                    : 'border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]'
                }`}
              >
                <LayoutList className="w-4 h-4" />
                List
              </button>
              <button
                type="button"
                data-testid="xp-view-grid"
                onClick={() => setViewPersist('grid')}
                aria-pressed={view === 'grid'}
                className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-2.5 border-b-2 -mb-px transition-colors ${
                  view === 'grid'
                    ? 'border-[var(--brand)] text-[var(--brand)]'
                    : 'border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Squares
              </button>
            </div>
          </div>
        </FadeIn>

        {experiences.length === 0 ? (
          <p className="py-12 text-[var(--ink-soft)] text-center">
            No experiences in this city yet.
          </p>
        ) : view === 'list' ? (
          <div className="border-t border-[var(--ink)]/15 mb-14">
            {experiences.map((xp, i) => (
              <FadeIn key={xp.id} delay={Math.min(i * 0.04, 0.2)}>
                <HoverImageReveal
                  src={xp.image}
                  alt={xp.title}
                  tone="light"
                  focus={xp.imageFocus || 'center center'}
                  className="min-h-[8rem] py-7 border-b border-[var(--ink)]/12 -mx-1 sm:-mx-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-wider text-[var(--zellige)] mb-1">
                        {xp.partnerType} · {xp.city}
                      </p>
                      <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--ink)] mb-1 group-hover/hover-img:text-[var(--brand)] transition-colors">
                        {xp.title}
                      </h2>
                      <p className="text-sm text-[var(--ink-soft)] mb-2">
                        {xp.location} · {xp.duration}
                      </p>
                      <p className="text-sm text-[var(--ink-soft)] leading-relaxed max-w-xl mb-3">
                        {xp.description}
                      </p>
                      <ul className="space-y-1 mb-3">
                        {xp.included.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-[var(--ink)]"
                          >
                            <Check className="w-4 h-4 text-[var(--brand)] shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={mapsUrl(`${xp.title} ${xp.location}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[var(--brand)] hover:underline"
                      >
                        {t('find_maps')} →
                      </a>
                    </div>
                    <p className="font-display text-lg font-bold text-[var(--brand)] shrink-0">
                      {xp.price}
                    </p>
                  </div>
                </HoverImageReveal>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {experiences.map((xp, i) => (
              <FadeIn key={xp.id} delay={Math.min(i * 0.04, 0.2)}>
                <article className="h-full flex flex-col border border-[var(--ink)]/12 bg-[var(--paper-deep)]/40 overflow-hidden">
                  <div className="relative aspect-square w-full bg-[var(--paper-deep)]">
                    <Image
                      src={xp.image}
                      alt={xp.title}
                      fill
                      className="object-cover"
                      style={{ objectPosition: xp.imageFocus || 'center center' }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-xs uppercase tracking-wider text-[var(--zellige)]">
                        {xp.partnerType}
                      </p>
                      <span className="font-display text-sm font-bold text-[var(--brand)] shrink-0">
                        {xp.price}
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-bold text-[var(--ink)] mb-1">
                      {xp.title}
                    </h2>
                    <p className="text-xs text-[var(--ink-soft)] mb-2">
                      {xp.city} · {xp.location} · {xp.duration}
                    </p>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-3 flex-1">
                      {xp.description}
                    </p>
                    <ul className="space-y-1 mb-4">
                      {xp.included.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-[var(--ink)]"
                        >
                          <Check className="w-4 h-4 text-[var(--brand)] shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={mapsUrl(`${xp.title} ${xp.location}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[var(--brand)] hover:underline mt-auto"
                    >
                      {t('find_maps')} →
                    </a>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn>
          <div className="border-y border-[var(--ink)]/15 py-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-2">
                Partners
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-2">
                {t('xp_partner_cta_title')}
              </h2>
              <p className="text-[var(--ink-soft)] max-w-xl leading-relaxed">
                {t('xp_partner_cta_text')}
              </p>
            </div>
            <Link
              href="/partners"
              className="btn-primary inline-flex items-center justify-center gap-2 shrink-0"
            >
              {t('partner_cta')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

export default function ExperiencesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--paper)] flex items-center justify-center text-[var(--ink-soft)]">
          Loading experiences…
        </div>
      }
    >
      <ExperiencesContent />
    </Suspense>
  );
}
