'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import HoverImageReveal from '@/components/HoverImageReveal';
import { EXPERIENCES, mapsUrl } from '@/data/places';
import { useI18n } from '@/lib/i18n';

export default function ExperiencesPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <FadeIn className="mb-10 md:mb-12 max-w-2xl">
          <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
            {t('xp_page_label')}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--ink)] leading-[1.1] mb-4">
            {t('xp_page_title')}
          </h1>
          <p className="text-[var(--ink-soft)] text-lg leading-relaxed">{t('xp_page_sub')}</p>
        </FadeIn>

        <div className="border-t border-[var(--ink)]/15 mb-14">
          {EXPERIENCES.map((xp, i) => (
            <FadeIn key={xp.id} delay={Math.min(i * 0.1, 0.5)}>
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
                      {xp.partnerType}
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
