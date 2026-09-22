'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  MapPin,
  Compass,
  ArrowRight,
  Store,
  PartyPopper,
  Utensils,
  Mountain,
  Mail,
  Building2,
  ExternalLink,
  Star,
  Moon,
} from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/FadeIn';
import { EXPERIENCES, PLACES, mapsUrl, type PlaceCategory } from '@/data/places';
import { useI18n } from '@/lib/i18n';
import PartnerCta from '@/components/PartnerCta';

const categoryIcon: Record<PlaceCategory, typeof Utensils> = {
  restaurants: Utensils,
  nightlife: PartyPopper,
  shopping: Store,
  monuments: Mountain,
  experiences: Compass,
  cafes: Utensils,
};

const featured = PLACES.slice(0, 6);
const featuredXP = EXPERIENCES.slice(0, 3);

export default function Home() {
  const { t } = useI18n();

  const modes = [
    {
      href: '/plan',
      num: '01',
      accent: 'from-[#D93D3D] to-[#B83232]',
      title: t('mode_plan_title'),
      text: t('mode_plan_text'),
    },
    {
      href: '/discover',
      num: '02',
      accent: 'from-[#2C3E50] to-[#1a2632]',
      title: t('mode_discover_title'),
      text: t('mode_discover_text'),
    },
    {
      href: '/experiences',
      num: '03',
      accent: 'from-[#C4923A] to-[#E1B168]',
      title: t('mode_xp_title'),
      text: t('mode_xp_text'),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF5]">
      <section className="relative min-h-[100svh] -mt-14 sm:-mt-16 flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/welcomebackground.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/75" />
        <div className="absolute inset-0 hero-shimmer opacity-20 bg-gradient-to-r from-transparent via-[#D93D3D]/20 to-transparent" />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16 sm:py-24 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <Image
              src="/images/logo.png"
              alt="MoroccoMate"
              width={280}
              height={280}
              className="mx-auto w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl font-medium tracking-wide text-white mb-2"
          >
            {t('hero_tagline')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-[#E1B168] text-lg md:text-xl mb-12"
            dir="rtl"
            lang="ar"
          >
            رحلتك تبدأ هنا
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/plan"
              className="inline-flex items-center justify-center gap-2 bg-[#D93D3D] hover:bg-[#B83232] text-white font-bold text-lg px-8 py-4 rounded-xl w-full sm:w-auto transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t('hero_plan')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/discover"
              className="inline-flex items-center justify-center gap-2 border border-[#E1B168]/60 text-[#E1B168] hover:bg-[#E1B168]/10 font-semibold px-8 py-4 rounded-xl w-full sm:w-auto transition-colors duration-300"
            >
              {t('hero_discover')}
            </Link>
            <Link
              href="/early-access"
              className="inline-flex items-center justify-center text-white/80 hover:text-white font-medium px-4 py-3 underline underline-offset-4 decoration-[#E1B168]/50 transition-colors duration-300"
            >
              {t('hero_early')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Ways in. Editorial list, not SaaS icon cards */}
      <section className="relative py-16 md:py-24 bg-[#FFFAF5] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D93D3D]/40 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn className="mb-10 md:mb-14">
            <p className="text-[#D93D3D] text-sm font-bold tracking-[0.2em] uppercase mb-3">
              MoroccoMate
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#2C3E50] leading-tight max-w-xl">
              {t('modes_title')}
            </h2>
            <p className="mt-4 text-[#2C3E50]/75 text-lg max-w-lg leading-relaxed">
              {t('modes_sub')}
            </p>
          </FadeIn>

          <div className="divide-y divide-[#2C3E50]/10 border-y border-[#2C3E50]/10">
            {modes.map((m, i) => (
              <FadeIn key={m.href} delay={i * 0.08}>
                <Link
                  href={m.href}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-8 md:py-10 transition-colors hover:bg-[#D93D3D]/[0.04] -mx-2 px-2"
                >
                  <span className="text-5xl md:text-6xl font-black text-[#D93D3D] tabular-nums shrink-0 w-20 drop-shadow-sm">
                    {m.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#2C3E50] group-hover:text-[#D93D3D] transition-colors mb-2">
                      {m.title}
                    </h3>
                    <p className="text-[#2C3E50]/70 text-base md:text-lg leading-relaxed max-w-xl">
                      {m.text}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[#D93D3D] font-bold text-sm tracking-wide uppercase shrink-0 self-start sm:self-center">
                    {t('open')}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#FFFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-8">
            <p className="text-[#D93D3D] text-sm font-bold tracking-[0.2em] uppercase mb-3">
              Destinations
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50]">
              Explore by city
            </h2>
            <p className="mt-3 text-[#2C3E50]/70 text-lg max-w-xl">
              City guides with real places, experiences, and a path to plan your days.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/marrakech', name: 'Marrakech', line: 'Medina, rooftops, Agafay' },
              { href: '/casablanca', name: 'Casablanca', line: 'Corniche nights, dining' },
              { href: '/rabat', name: 'Rabat', line: 'Kasbah, capital calm' },
              { href: '/tangier', name: 'Tangier', line: 'Strait views, cafés' },
            ].map((c, i) => (
              <FadeIn key={c.href} delay={i * 0.05}>
                <Link
                  href={c.href}
                  className="group block rounded-2xl border border-[#2C3E50]/10 bg-white p-6 hover:border-[#D93D3D]/40 transition-colors h-full"
                >
                  <h3 className="text-xl font-bold text-[#2C3E50] group-hover:text-[#D93D3D] transition-colors mb-1">
                    {c.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{c.line}</p>
                  <span className="inline-flex items-center gap-1 text-[#D93D3D] font-semibold text-sm">
                    Open guide
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-[#FFFAF5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <PartnerCta />
          </FadeIn>
        </div>
      </section>

      {/* Places. No stock photos, dark-on-dark cards */}
      <section className="py-20 bg-[#2C3E50] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#D93D3D,transparent_40%),radial-gradient(circle_at_80%_60%,#E1B168,transparent_35%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[#E1B168] font-semibold text-sm uppercase tracking-wider mb-2">
                {t('real_spots')}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">{t('real_spots_title')}</h2>
            </div>
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 text-[#E1B168] font-semibold"
            >
              {t('browse_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p) => {
              const Icon = categoryIcon[p.category] || MapPin;
              return (
                <StaggerItem key={p.id}>
                  <article
                    className="place-card-fade-dark rounded-2xl border border-white/10 bg-[#243447] hover:border-[#E1B168]/40 transition-all duration-300 p-5 h-full flex flex-col"
                    style={{ ['--place-photo' as string]: `url(${p.image})` }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#D93D3D]/20 border border-[#D93D3D]/30 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#E1B168]" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#D93D3D] text-white capitalize">
                        {p.category}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-lg text-white">{p.name}</h3>
                      <span className="flex items-center gap-1 text-sm text-[#E1B168] shrink-0">
                        <Star className="w-3.5 h-3.5 fill-[#E1B168]" />
                        {p.rating}
                      </span>
                    </div>
                    <p className="text-white/55 text-sm mb-3 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {p.neighborhood}
                    </p>
                    <p className="text-white/80 text-sm line-clamp-3 mb-5 flex-1">
                      {p.description}
                    </p>
                    <a
                      href={mapsUrl(p.mapsQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#E1B168] hover:text-white"
                    >
                      {t('google_maps')} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>

          <FadeIn delay={0.15} className="mt-8 flex flex-wrap gap-3 justify-center text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
              <Utensils className="w-4 h-4 text-[#E1B168]" /> Nomad, Rick&apos;s Café, La Sqala…
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
              <Moon className="w-4 h-4 text-[#E1B168]" /> Theatro, Comptoir Darna, Sky 28…
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
              <Store className="w-4 h-4 text-[#E1B168]" /> Souks, Ensemble Artisanal, Morocco Mall…
            </span>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-3">
              {t('xp_title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('xp_sub')}</p>
          </FadeIn>

          <Stagger className="grid md:grid-cols-3 gap-6 mb-10">
            {featuredXP.map((xp) => (
              <StaggerItem key={xp.id}>
                <div
                  className="card place-card-fade h-full border border-[#E1B168]/20 hover:border-[#D93D3D]/40 transition-colors"
                  style={{ ['--place-photo' as string]: `url(${xp.image})` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FCE8E8] text-[#D93D3D]">
                      {xp.partnerType}
                    </span>
                    <span className="text-sm font-bold text-[#D93D3D]">{xp.price}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 text-[#2C3E50]">{xp.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {xp.location} · {xp.duration}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-3">{xp.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn className="text-center">
            <Link href="/experiences" className="btn-primary inline-flex items-center gap-2">
              {t('see_all_xp')} <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <FadeIn>
            <div className="rounded-2xl p-8 md:p-10 bg-gradient-to-br from-[#D93D3D] to-[#B83232] text-white h-full shadow-xl">
              <Mail className="w-10 h-10 mb-4 text-[#E1B168]" />
              <h3 className="text-2xl font-bold mb-3">{t('early_title')}</h3>
              <p className="text-white/90 mb-6">{t('early_text')}</p>
              <Link
                href="/early-access"
                className="inline-flex items-center gap-2 bg-white text-[#D93D3D] font-bold px-6 py-3 rounded-xl hover:bg-[#FFFAF5]"
              >
                {t('early_cta')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl p-8 md:p-10 bg-[#2C3E50] text-white h-full shadow-xl border border-[#E1B168]/30">
              <Building2 className="w-10 h-10 mb-4 text-[#E1B168]" />
              <h3 className="text-2xl font-bold mb-3">{t('partner_title')}</h3>
              <p className="text-white/90 mb-6">{t('partner_text')}</p>
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 bg-[#E1B168] text-[#2C3E50] font-bold px-6 py-3 rounded-xl hover:bg-[#d4a45c]"
              >
                {t('partner_cta')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
