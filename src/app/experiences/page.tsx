'use client';

import Link from 'next/link';
import { Check, Clock, MapPin, ArrowRight, Mountain } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/FadeIn';
import { EXPERIENCES, mapsUrl } from '@/data/places';
import { useI18n } from '@/lib/i18n';

export default function ExperiencesPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeIn className="mb-10 max-w-3xl">
          <p className="text-[#D93D3D] font-semibold text-sm uppercase tracking-wider mb-2">
            {t('xp_page_label')}
          </p>
          <h1 className="text-4xl font-bold text-gradient mb-3">{t('xp_page_title')}</h1>
          <p className="text-gray-600">{t('xp_page_sub')}</p>
        </FadeIn>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {EXPERIENCES.map((xp) => (
            <StaggerItem key={xp.id}>
              <article
                className="card place-card-fade h-full flex flex-col border border-[#E1B168]/25 hover:border-[#D93D3D]/40 transition-colors"
                style={{ ['--place-photo' as string]: `url(${xp.image})` }}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#FCE8E8] flex items-center justify-center">
                    <Mountain className="w-5 h-5 text-[#D93D3D]" />
                  </div>
                  <span className="text-sm font-bold text-[#D93D3D]">{xp.price}</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFFAF5] border border-[#E1B168]/40 text-[#2C3E50] w-fit mb-3">
                  {xp.partnerType}
                </span>
                <h2 className="text-xl font-semibold mb-2 text-[#2C3E50]">{xp.title}</h2>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {xp.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {xp.duration}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 flex-1">{xp.description}</p>
                <ul className="space-y-1.5 mb-4">
                  {xp.included.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-[#D93D3D] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={mapsUrl(`${xp.title} ${xp.location}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#D93D3D] hover:underline"
                >
                  {t('find_maps')} →
                </a>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn>
          <div className="rounded-2xl bg-[#2C3E50] text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{t('xp_partner_cta_title')}</h2>
              <p className="text-white/80 max-w-xl">{t('xp_partner_cta_text')}</p>
            </div>
            <Link
              href="/partners"
              className="inline-flex items-center justify-center gap-2 bg-[#E1B168] text-[#2C3E50] font-bold px-6 py-3 rounded-xl shrink-0"
            >
              {t('partner_cta')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
