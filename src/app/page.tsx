'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, MapPin, Star } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import HoverImageReveal from '@/components/HoverImageReveal';
import { EXPERIENCES, PLACES, mapsUrl } from '@/data/places';
import { useI18n } from '@/lib/i18n';
import PartnerCta from '@/components/PartnerCta';

const featuredIds = [
  'cafe-des-epices',
  'cafe-hafa',
  'souk-semmarine',
  'bahia-palace',
  'rick-cafe',
  'jardin-majorelle',
];
const featured = featuredIds
  .map((id) => PLACES.find((p) => p.id === id))
  .filter((p): p is (typeof PLACES)[number] => Boolean(p));
const featuredXP = EXPERIENCES.slice(0, 3);

const cities = [
  { href: '/marrakech', name: 'Marrakech', line: 'Medina, rooftops, Agafay' },
  { href: '/casablanca', name: 'Casablanca', line: 'Corniche nights, dining' },
  { href: '/rabat', name: 'Rabat', line: 'Kasbah, capital calm' },
  { href: '/tangier', name: 'Tangier', line: 'Strait views, cafés' },
];

export default function Home() {
  const { t } = useI18n();

  const modes = [
    {
      href: '/plan',
      num: '01',
      title: t('mode_plan_title'),
      text: t('mode_plan_text'),
    },
    {
      href: '/discover',
      num: '02',
      title: t('mode_discover_title'),
      text: t('mode_discover_text'),
    },
    {
      href: '/experiences',
      num: '03',
      title: t('mode_xp_title'),
      text: t('mode_xp_text'),
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Hero: brand first, full-bleed photo, tight CTA set */}
      <section className="relative min-h-[100svh] -mt-14 sm:-mt-16 flex items-end sm:items-center overflow-hidden">
        <div className="absolute inset-0 hero-ken">
          <Image
            src="/images/welcomebackground.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,18,24,0.92)] via-[rgba(12,18,24,0.55)] to-[rgba(12,18,24,0.25)]" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-14 sm:py-24 text-white">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={56}
              height={56}
              className="w-12 h-12 sm:w-14 sm:h-14"
              priority
            />
            <p
              className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none"
              aria-label="MoroccoMate"
            >
              MoroccoMate
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-white/90 max-w-xl mb-3"
          >
            {t('hero_tagline')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="text-[var(--saffron)] text-2xl sm:text-3xl md:text-4xl font-medium mb-10"
            dir="rtl"
            lang="ar"
          >
            رحلتك تبدأ هنا
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <Link href="/plan" className="btn-primary text-base sm:text-lg px-7 py-3.5">
              {t('hero_plan')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/discover"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-md transition-colors"
            >
              {t('hero_discover')}
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 bg-[var(--paper)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn className="mb-10 md:mb-14">
            <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
              MoroccoMate
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--ink)] leading-[1.1] max-w-xl">
              {t('modes_title')}
            </h2>
            <p className="mt-4 text-[var(--ink-soft)] text-lg max-w-lg leading-relaxed">
              {t('modes_sub')}
            </p>
          </FadeIn>

          <div className="border-y border-[var(--ink)]/15">
            {modes.map((m, i) => (
              <FadeIn key={m.href} delay={i * 0.06}>
                <Link
                  href={m.href}
                  className="group flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 py-8 md:py-9 border-b border-[var(--ink)]/10 last:border-b-0"
                >
                  <span className="font-display text-4xl md:text-5xl font-extrabold text-[var(--brand)] tabular-nums shrink-0 w-16">
                    {m.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors mb-2">
                      {m.title}
                    </h3>
                    <p className="text-[var(--ink-soft)] text-base md:text-lg leading-relaxed max-w-xl">
                      {m.text}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[var(--brand)] font-semibold text-sm tracking-wide uppercase shrink-0 self-start sm:self-center pt-1">
                    {t('open')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[var(--paper-deep)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn className="mb-8">
            <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
              Destinations
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)]">
              Explore by city
            </h2>
            <p className="mt-3 text-[var(--ink-soft)] text-lg max-w-xl">
              City guides with real places, experiences, and a path to plan your days.
            </p>
          </FadeIn>
          <div className="border-t border-[var(--ink)]/15">
            {cities.map((c, i) => (
              <FadeIn key={c.href} delay={i * 0.04}>
                <Link
                  href={c.href}
                  className="group flex items-baseline justify-between gap-4 py-5 border-b border-[var(--ink)]/12"
                >
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-sm text-[var(--ink-soft)] mt-0.5">{c.line}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[var(--brand)] shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-[var(--paper)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <PartnerCta />
          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-[var(--ink)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[var(--saffron)] text-xs font-bold tracking-[0.22em] uppercase mb-2">
                {t('real_spots')}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                {t('real_spots_title')}
              </h2>
            </div>
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 text-[var(--saffron)] font-semibold"
            >
              {t('browse_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>

          <div className="border-t border-white/15">
            {featured.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.04}>
                <HoverImageReveal
                  src={p.image}
                  alt={p.name}
                  tone="dark"
                  focus={p.imageFocus || 'center center'}
                  className="min-h-[7.5rem] py-6 border-b border-white/12 -mx-1 sm:-mx-2"
                >
                  <article className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                        <h3 className="font-display text-xl font-bold text-white group-hover/hover-img:text-[var(--saffron)] transition-colors">
                          {p.name}
                        </h3>
                        <span className="text-xs uppercase tracking-wider text-white/45">
                          {p.category}
                        </span>
                      </div>
                      <p className="text-white/50 text-sm mb-2 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {p.neighborhood}
                      </p>
                      <p className="text-white/75 text-sm leading-relaxed max-w-2xl line-clamp-2">
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
                        className="inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-[var(--saffron)]"
                      >
                        {t('google_maps')} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                </HoverImageReveal>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-pattern">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)] mb-3">
              {t('xp_title')}
            </h2>
            <p className="text-[var(--ink-soft)] max-w-xl text-lg">{t('xp_sub')}</p>
          </FadeIn>

          <div className="border-t border-[var(--ink)]/15 mb-10">
            {featuredXP.map((xp, i) => (
              <FadeIn key={xp.id} delay={i * 0.05}>
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

          <FadeIn>
            <Link href="/experiences" className="btn-primary">
              {t('see_all_xp')} <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 border-t border-[var(--ink)]/10 bg-[var(--paper)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 md:gap-16">
          <FadeIn>
            <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
              Travelers
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-3">
              {t('early_title')}
            </h3>
            <p className="text-[var(--ink-soft)] mb-6 leading-relaxed">{t('early_text')}</p>
            <Link
              href="/early-access"
              className="inline-flex items-center gap-2 text-[var(--brand)] font-bold hover:gap-3 transition-all"
            >
              {t('early_cta')} <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
              Partners
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-3">
              {t('partner_title')}
            </h3>
            <p className="text-[var(--ink-soft)] mb-6 leading-relaxed">{t('partner_text')}</p>
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 text-[var(--brand)] font-bold hover:gap-3 transition-all"
            >
              {t('partner_cta')} <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
