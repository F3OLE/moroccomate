'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/FadeIn';
import ExperienceCard from '@/components/ExperienceCard';
import { EXPERIENCES } from '@/data/places';
import { useI18n } from '@/lib/i18n';

export default function ExperiencesPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <FadeIn className="mb-10 sm:mb-12 max-w-3xl">
          <p className="text-[#D93D3D] font-semibold text-sm uppercase tracking-wider mb-2">
            {t('xp_page_label')}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-3">{t('xp_page_title')}</h1>
          <p className="text-gray-600 text-lg">{t('xp_page_sub')}</p>
        </FadeIn>

        <Stagger className="grid lg:grid-cols-2 gap-6 mb-16">
          {EXPERIENCES.map((xp) => (
            <StaggerItem key={xp.id}>
              <ExperienceCard xp={xp} layout="row" />
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
