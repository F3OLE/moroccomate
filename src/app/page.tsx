'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
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
  ChevronDown,
  Landmark,
  Coins,
  Quote,
} from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/FadeIn';
import ExperienceCard from '@/components/ExperienceCard';
import { EXPERIENCES, PLACES, mapsUrl, type PlaceCategory } from '@/data/places';
import { CITY_HUBS } from '@/data/cities';
import { useI18n } from '@/lib/i18n';

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

const placesMapped = `${Math.floor(PLACES.length / 10) * 10}+`;
const cityCount = new Set(
  PLACES.map((p) => p.city).filter((c) => c !== 'nationwide')
).size;

const ease = [0.22, 1, 0.36, 1] as const;
const SECTION_Y = 'py-[100px] md:py-[120px]';

// Placeholder quotes. Replace with real traveler reviews before promoting the site.
const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    from: 'London, UK',
    trip: 'Marrakech · 5 days',
    quote:
      'The day-by-day plan saved us hours. Every restaurant it suggested was real, and the Maps links made the medina so much less stressful.',
  },
  {
    name: 'Lucas D.',
    from: 'Lyon, France',
    trip: 'Casablanca · weekend',
    quote:
      'We ended up at places locals actually go to. The Corniche dinner picks were the highlight of the trip.',
  },
  {
    name: 'Ana R.',
    from: 'Madrid, Spain',
    trip: 'Marrakech + Agafay',
    quote:
      'Booked a sunset quad ride through MoroccoMate on WhatsApp. Fast reply, fair price, zero haggling.',
  },
];

export default function Home() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  const modes = [
    {
      href: '/plan',
      num: '01',
      title: t('mode_plan_title'),
      text: t('mode_plan_text'),
      image: '/images/places/le-jardin.jpg',
      alt: 'Riad courtyard with palms and a pool in Marrakech',
    },
    {
      href: '/discover',
      num: '02',
      title: t('mode_discover_title'),
      text: t('mode_discover_text'),
      image: '/images/places/souk-semmarine.jpg',
      alt: 'Souk Semmarine alley in the Marrakech medina',
    },
    {
      href: '/experiences',
      num: '03',
      title: t('mode_xp_title'),
      text: t('mode_xp_text'),
      image: '/images/experiences/balloon.jpg',
      alt: 'Hot air balloon landing outside Marrakech',
    },
  ];

  const stats = [
    { icon: MapPin, value: placesMapped, label: 'places mapped' },
    { icon: Landmark, value: String(cityCount), label: 'cities' },
    { icon: Coins, value: 'Real', label: 'local prices in MAD' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF5]">
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[620px] -mt-14 sm:-mt-16 flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.06, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease }}
        >
          <Image
            src="/images/welcomebackground.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/75" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center text-white flex flex-col items-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="rounded-2xl bg-[#FFFAF5] p-3 sm:p-3.5 shadow-[0_14px_40px_rgba(0,0,0,0.35)]">
              <Image
                src="/images/logo-mark.png"
                alt=""
                width={364}
                height={420}
                priority
                className="w-11 sm:w-14 md:w-16 h-auto"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease }}
            className="mt-6 text-5xl sm:text-[64px] md:text-[80px] font-extrabold leading-none tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
          >
            MoroccoMate
          </motion.h1>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease }}
            className="mt-5 flex flex-col items-center gap-1.5"
          >
            <p className="text-xl sm:text-2xl md:text-[28px] font-medium text-white/95">
              {t('hero_tagline')}
            </p>
            <p className="text-xl sm:text-2xl md:text-[26px] text-[#E1B168]" dir="rtl" lang="ar">
              رحلتك تبدأ هنا
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease }}
            className="mt-10 w-full flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/plan"
              className="inline-flex items-center justify-center gap-2 bg-[#D93D3D] hover:bg-[#B83232] text-white font-bold text-lg px-8 py-4 rounded-xl w-full sm:w-auto shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              {t('hero_plan')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/discover"
              className="inline-flex items-center justify-center gap-2 border border-[#E1B168]/70 text-[#E1B168] hover:bg-[#E1B168]/10 font-semibold px-8 py-4 rounded-xl w-full sm:w-auto transition-colors duration-300"
            >
              {t('hero_discover')}
            </Link>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              href="/early-access"
              className="mt-4 inline-block text-white/75 hover:text-white text-sm font-medium underline underline-offset-4 decoration-[#E1B168]/50 transition-colors duration-300"
            >
              {t('hero_early')}
            </Link>
          </motion.div>
        </div>

        <motion.a
          href="#features"
          aria-label="Scroll down"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors"
        >
          <motion.span
            className="block"
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-7 h-7" strokeWidth={1.75} />
          </motion.span>
        </motion.a>
      </section>

      {/* Stats + features */}
      <section id="features" className={`${SECTION_Y} scroll-mt-16`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-3 rounded-2xl bg-white border border-[#2C3E50]/[0.07] shadow-[0_10px_30px_-12px_rgba(44,62,80,0.18)] divide-x divide-[#2C3E50]/[0.08]">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-3 py-6 sm:py-8 text-center sm:text-left"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FCE8E8] flex items-center justify-center shrink-0">
                    <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#D93D3D]" />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#2C3E50] leading-none">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="mt-[100px] md:mt-[120px] mb-14 md:mb-20 text-center max-w-2xl mx-auto">
            <p className="text-[#D93D3D] text-sm font-bold tracking-[0.2em] uppercase mb-3">
              MoroccoMate
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#2C3E50] leading-tight">
              {t('modes_title')}
            </h2>
            <p className="mt-4 text-[#2C3E50]/70 text-lg leading-relaxed">
              {t('modes_sub')}
            </p>
          </FadeIn>

          <div className="space-y-20 md:space-y-28">
            {modes.map((m, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={m.href}
                  className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
                >
                  <FadeIn className={flip ? 'md:order-2' : ''}>
                    <Link
                      href={m.href}
                      className="group block relative aspect-[4/3] rounded-[12px] overflow-hidden shadow-[0_20px_45px_-15px_rgba(44,62,80,0.4)]"
                    >
                      <Image
                        src={m.image}
                        alt={m.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </Link>
                  </FadeIn>
                  <FadeIn delay={0.08} className={flip ? 'md:order-1' : ''}>
                    <span className="text-6xl md:text-7xl font-black text-[#D93D3D]/15 tabular-nums leading-none">
                      {m.num}
                    </span>
                    <h3 className="mt-2 text-2xl md:text-4xl font-bold text-[#2C3E50]">
                      {m.title}
                    </h3>
                    <p className="mt-4 text-[#2C3E50]/70 text-base md:text-lg leading-relaxed max-w-md">
                      {m.text}
                    </p>
                    <Link
                      href={m.href}
                      className="group mt-6 inline-flex items-center gap-2 text-[#D93D3D] font-bold text-sm tracking-wide uppercase"
                    >
                      {t('open')}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </FadeIn>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${SECTION_Y} bg-white`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12 md:mb-16">
            <p className="text-[#D93D3D] text-sm font-bold tracking-[0.2em] uppercase mb-3">
              Reviews
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#2C3E50]">
              What travelers say
            </h2>
          </FadeIn>
          <Stagger className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((r) => (
              <StaggerItem key={r.name}>
                <figure className="h-full rounded-2xl bg-[#FFFAF5] border border-[#E1B168]/25 p-7 flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#E1B168] text-[#E1B168]" />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-[#D93D3D]/20" />
                  </div>
                  <blockquote className="text-[#2C3E50] text-base leading-relaxed flex-1">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D93D3D] to-[#E1B168] text-white font-bold flex items-center justify-center">
                      {r.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-bold text-[#2C3E50]">{r.name}</span>
                      <span className="block text-sm text-gray-500">
                        {r.from} · {r.trip}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Cities */}
      <section className={SECTION_Y}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[#D93D3D] text-sm font-bold tracking-[0.2em] uppercase mb-3">
                Destinations
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#2C3E50]">
                Explore by city
              </h2>
            </div>
            <p className="text-[#2C3E50]/70 text-lg max-w-md">
              City guides with real places, experiences, and a path to plan your days.
            </p>
          </FadeIn>

          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4 md:scroll-px-0 -mx-4 px-4 md:mx-0 md:px-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CITY_HUBS.map((c, i) => (
              <FadeIn
                key={c.slug}
                delay={i * 0.06}
                className="shrink-0 w-[75%] sm:w-[45%] md:w-auto snap-start"
              >
                <Link
                  href={`/${c.slug}`}
                  className="group relative block aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_18px_40px_-15px_rgba(44,62,80,0.45)]"
                >
                  <Image
                    src={c.heroImage}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 75vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-2xl md:text-[28px] font-bold text-white leading-tight">
                      {c.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/80 line-clamp-2">{c.tagline}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#E1B168]">
                      Open guide
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Places */}
      <section className={`${SECTION_Y} bg-[#2C3E50] text-white relative overflow-hidden`}>
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

      {/* Experiences */}
      <section className={`${SECTION_Y} bg-pattern`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-3">
              {t('xp_title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('xp_sub')}</p>
          </FadeIn>

          <Stagger className="grid md:grid-cols-3 gap-6 mb-12">
            {featuredXP.map((xp) => (
              <StaggerItem key={xp.id}>
                <ExperienceCard xp={xp} />
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

      {/* Early access + partners */}
      <section className={SECTION_Y}>
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
