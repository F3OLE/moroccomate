'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  MapPin,
  Star,
  Filter,
  Utensils,
  PartyPopper,
  Store,
  Mountain,
  Compass,
  Coffee,
  BadgeCheck,
  Sun,
} from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/FadeIn';
import { PLACES, mapsUrl, placeBestTime, cityDisplayName, type PlaceCategory } from '@/data/places';
import { useI18n, type MessageKey } from '@/lib/i18n';
import PartnerCta from '@/components/PartnerCta';
import BookButton from '@/components/BookButton';

const categoryIcon: Record<PlaceCategory, typeof Utensils> = {
  restaurants: Utensils,
  nightlife: PartyPopper,
  shopping: Store,
  monuments: Mountain,
  experiences: Compass,
  cafes: Coffee,
};

export default function DiscoverPage() {
  const { t } = useI18n();
  const [category, setCategory] = useState<PlaceCategory | 'all'>('all');
  const [city, setCity] = useState('all');

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
    { id: 'marrakesh', label: 'Marrakech' },
    { id: 'casablanca', label: 'Casablanca' },
    { id: 'rabat', label: 'Rabat' },
    { id: 'tangier', label: 'Tangier' },
  ];

  const places = useMemo(() => {
    return PLACES.filter((p) => {
      const catOk = category === 'all' || p.category === category;
      const cityOk = city === 'all' || p.city === city;
      return catOk && cityOk;
    });
  }, [category, city]);

  return (
    <div className="min-h-screen bg-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeIn className="mb-10">
          <p className="text-[#D93D3D] font-semibold text-sm uppercase tracking-wider mb-2">
            {t('discover_label')}
          </p>
          <h1 className="text-4xl font-bold text-gradient mb-3">{t('discover_title')}</h1>
          <p className="text-gray-600 max-w-2xl mb-6">{t('discover_sub')}</p>
          <PartnerCta />
        </FadeIn>

        <FadeIn delay={0.05} className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter className="w-4 h-4" /> {t('filter')}
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCity(c.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  city === c.id
                    ? 'bg-[#2C3E50] text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#D93D3D]'
                }`}
              >
                {'labelKey' in c && c.labelKey ? t(c.labelKey) : c.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setCategory(f.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === f.id
                    ? 'bg-[#D93D3D] text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#D93D3D]'
                }`}
              >
                {f.labelKey ? t(f.labelKey) : f.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((p) => {
            const Icon = categoryIcon[p.category] || MapPin;
            return (
              <StaggerItem key={p.id}>
                <article
                  className="card place-card-fade h-full hover:-translate-y-1 transition-transform duration-300 border border-gray-100"
                  style={{ ['--place-photo' as string]: `url(${p.image})` }}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#FCE8E8]/95 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#D93D3D]" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#D93D3D] text-white capitalize">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-gray-900">{p.name}</h2>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {p.badge === 'partner' && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#D93D3D] text-white">
                            <BadgeCheck className="w-3 h-3" /> Partner
                          </span>
                        )}
                        {p.badge === 'verified' && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#2C3E50] text-white">
                            <BadgeCheck className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-[#D93D3D] shrink-0">
                      <Star className="w-3.5 h-3.5 fill-[#E1B168] text-[#E1B168]" />
                      {p.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2 flex items-center gap-1 capitalize">
                    <MapPin className="w-3.5 h-3.5" />
                    {p.city === 'marrakesh'
                      ? 'Marrakech'
                      : p.city === 'tangier'
                        ? 'Tangier'
                        : p.city.charAt(0).toUpperCase() + p.city.slice(1)}{' '}
                    · {p.neighborhood}
                  </p>
                  <p className="text-xs text-[#C4923A] font-medium mb-2 flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5" />
                    {placeBestTime(p)}
                  </p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{p.description}</p>
                  <div className="flex items-center justify-between gap-2 mt-auto flex-wrap">
                    <span className="text-sm font-medium text-gray-700">{p.priceRange}</span>
                    <div className="flex items-center gap-2">
                      <BookButton
                        place={{
                          placeId: p.id,
                          placeName: p.name,
                          city: cityDisplayName(p.city),
                          whatsapp: p.whatsapp,
                          badge: p.badge,
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md bg-[#25D366] text-white shrink-0"
                      />
                      <a
                        href={mapsUrl(p.mapsQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#D93D3D] shrink-0"
                      >
                        {t('google_maps')} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <FadeIn className="mt-12 space-y-8">
          <PartnerCta />
          <div className="text-center">
            <p className="text-gray-600 mb-4">{t('want_plan')}</p>
            <Link href="/plan" className="btn-primary inline-flex">
              {t('build_itinerary')}
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
