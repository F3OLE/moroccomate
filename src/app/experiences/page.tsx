'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import ExperienceCard from '@/components/ExperienceCard';
import DiscoverGate, { hasDiscoverAccess } from '@/components/DiscoverGate';
import { EXPERIENCES } from '@/data/places';
import { useI18n } from '@/lib/i18n';

/** Experiences shown before the early-access gate */
const FREE_LIMIT = 4;

export default function ExperiencesPage() {
  const { t } = useI18n();
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(hasDiscoverAccess());
  }, []);

  const gated = !unlocked && EXPERIENCES.length > FREE_LIMIT + 2;
  const visible = gated ? EXPERIENCES.slice(0, FREE_LIMIT) : EXPERIENCES;

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <FadeIn className="mb-10 md:mb-12 max-w-2xl">
          <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
            {t('xp_page_label')}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--ink)] leading-[1.1] mb-4">
            {t('xp_page_title')}
          </h1>
          <p className="text-[var(--ink-soft)] text-lg leading-relaxed">{t('xp_page_sub')}</p>
        </FadeIn>

        <div className={`grid gap-6 ${gated ? 'mb-6' : 'mb-[100px]'}`}>
          {visible.map((xp, i) => (
            <FadeIn key={xp.id} delay={Math.min((i % FREE_LIMIT) * 0.08, 0.4)}>
              <ExperienceCard xp={xp} layout="row" />
            </FadeIn>
          ))}
        </div>

        {gated && (
          <div className="relative min-h-[36rem] sm:min-h-[30rem] mb-[100px]">
            <div inert className="grid gap-6 pointer-events-none select-none blur-[5px] opacity-60">
              {EXPERIENCES.slice(FREE_LIMIT, FREE_LIMIT + 2).map((xp) => (
                <ExperienceCard key={`teaser-${xp.id}`} xp={xp} layout="row" />
              ))}
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--paper)]/75 to-[var(--paper)]"
              aria-hidden
            />
            <div className="absolute inset-x-0 top-6 sm:top-10 flex justify-center">
              <DiscoverGate
                variant="experiences"
                previews={EXPERIENCES.slice(FREE_LIMIT).map((xp) => ({ image: xp.image, name: xp.title }))}
                lockedCount={EXPERIENCES.length - FREE_LIMIT}
                city="all"
                onUnlocked={() => setUnlocked(true)}
              />
            </div>
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
