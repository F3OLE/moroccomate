'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ChevronDown,
  Coins,
  ExternalLink,
  Landmark,
  MapPin,
  Quote,
  Star,
} from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/FadeIn';
import HeroParallax from '@/components/HeroParallax';
import HoverImageReveal from '@/components/HoverImageReveal';
import ExperienceCard from '@/components/ExperienceCard';
import { EXPERIENCES, PLACES, mapsUrl } from '@/data/places';
import { CITY_HUBS } from '@/data/cities';
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

const placesMapped = `${Math.floor(PLACES.length / 10) * 10}+`;
const cityCount = new Set(
  PLACES.map((p) => p.city).filter((c) => c !== 'nationwide')
).size;

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
      alt: 'Hot air balloon over the countryside outside Marrakech',
    },
  ];

  const stats = [
    { icon: MapPin, value: placesMapped, label: 'places mapped' },
    { icon: Landmark, value: String(cityCount), label: 'cities' },
    { icon: Coins, value: 'Real', label: 'local prices in MAD' },
  ];

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Hero: full viewport, Marrakech photo, parallax + grain */}
      <section className="relative h-[100vh] min-h-[100vh] -mt-14 sm:-mt-16 flex items-end sm:items-center overflow-hidden">
        <HeroParallax className="absolute inset-0 scale-110 origin-center">
          <div className="absolute inset-0">
            <Image
              src="/images/welcomebackground.png"
              alt=""
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </HeroParallax>
        {/* Dark at bottom → transparent at top */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[rgba(12,18,24,0.94)] via-[rgba(12,18,24,0.45)] to-transparent" />
        <div className="hero-grain" aria-hidden />
        <div className="hero-palms" aria-hidden>
          <svg className="hero-palm hero-palm-left" viewBox="0 0 200 280" fill="currentColor">
            <ellipse cx="100" cy="268" rx="48" ry="8" opacity="0.35" />
            <path d="M98 270 V118" stroke="currentColor" strokeWidth="7" fill="none" />
            <path d="M100 120 C40 95 18 55 28 28 C55 48 78 78 100 120 Z" />
            <path d="M100 118 C55 70 58 22 78 8 C88 42 96 78 100 118 Z" />
            <path d="M100 116 C90 55 112 12 142 6 C128 48 112 82 100 116 Z" />
            <path d="M102 118 C145 88 178 55 182 28 C155 48 128 78 102 118 Z" />
            <path d="M102 122 C158 115 188 95 192 72 C162 88 128 108 102 122 Z" />
            <path d="M98 122 C42 128 18 108 12 82 C38 95 72 112 98 122 Z" />
          </svg>
          <svg className="hero-palm hero-palm-right" viewBox="0 0 200 280" fill="currentColor">
            <ellipse cx="100" cy="268" rx="52" ry="9" opacity="0.3" />
            <path d="M102 270 V108" stroke="currentColor" strokeWidth="8" fill="none" />
            <path d="M100 112 C38 90 12 48 22 18 C52 40 78 72 100 112 Z" />
            <path d="M100 110 C52 62 48 14 72 2 C86 38 96 72 100 110 Z" />
            <path d="M100 108 C95 42 120 4 152 0 C136 42 114 76 100 108 Z" />
            <path d="M102 110 C148 78 186 42 190 14 C162 38 130 72 102 110 Z" />
            <path d="M104 114 C162 108 194 84 198 58 C168 78 132 100 104 114 Z" />
            <path d="M96 116 C40 122 10 98 6 70 C32 86 68 106 96 116 Z" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-14 sm:py-24 text-white">
          <div className="hero-fade flex items-center gap-3 mb-6">
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
          </div>

          <p className="hero-fade-delay-1 font-display text-xl sm:text-2xl md:text-3xl font-medium text-white/90 max-w-xl mb-3">
            {t('hero_tagline')}
          </p>
          <p
            className="hero-fade-delay-2 w-fit text-[var(--saffron)] text-2xl sm:text-3xl md:text-4xl font-medium mb-10"
            dir="rtl"
            lang="ar"
          >
            رحلتك تبدأ هنا
          </p>

          <div className="hero-fade-delay-3 flex flex-col sm:flex-row sm:items-center gap-3">
            <Link href="/plan" className="btn-primary text-base sm:text-lg px-7 py-3.5">
              {t('hero_plan')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/discover"
              className="btn-secondary text-base sm:text-lg px-7 py-3.5"
            >
              {t('hero_discover')}
            </Link>
          </div>
        </div>

        <a
          href="#features"
          aria-label="Scroll down"
          className="hero-fade-delay-3 absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white"
        >
          <ChevronDown className="scroll-cue w-7 h-7" strokeWidth={1.75} />
        </a>
      </section>

      <section id="features" className="relative section-pad section-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="grid grid-cols-3 rounded-[12px] bg-[var(--paper)] border border-[var(--ink)]/10 divide-x divide-[var(--ink)]/10">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-3 py-6 sm:py-8 text-center sm:text-left"
                >
                  <s.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--brand)] shrink-0" strokeWidth={1.75} />
                  <div>
                    <p className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--ink)] leading-none">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-[var(--ink-soft)]">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="mt-[100px] md:mt-[120px] mb-14 md:mb-20 max-w-2xl">
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

          <div className="space-y-20 md:space-y-28">
            {modes.map((m, i) => {
              const flip = i % 2 === 1;
              return (
                <div key={m.href} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <FadeIn className={flip ? 'md:order-2' : ''}>
                    <Link
                      href={m.href}
                      className="group block relative aspect-[4/3] rounded-[12px] overflow-hidden shadow-[0_20px_45px_-18px_rgba(21,32,43,0.45)]"
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
                    <span className="font-display text-5xl md:text-6xl font-extrabold text-[var(--brand)] tabular-nums leading-none">
                      {m.num}
                    </span>
                    <h3 className="mt-3 font-display text-2xl md:text-4xl font-bold text-[var(--ink)]">
                      {m.title}
                    </h3>
                    <p className="mt-4 text-[var(--ink-soft)] text-base md:text-lg leading-relaxed max-w-md">
                      {m.text}
                    </p>
                    <Link
                      href={m.href}
                      className="group mt-6 inline-flex items-center gap-2 text-[var(--brand)] font-semibold text-sm tracking-wide uppercase"
                    >
                      {t('open')}
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </FadeIn>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad section-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="mb-12 md:mb-16">
            <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
              Reviews
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--ink)]">
              What travelers say
            </h2>
          </FadeIn>
          <Stagger className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((r) => (
              <StaggerItem key={r.name}>
                <figure className="h-full rounded-[12px] bg-white border border-[var(--ink)]/10 shadow-[0_8px_24px_rgba(21,32,43,0.06)] p-7 flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[var(--saffron)] text-[var(--saffron)]" />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-[var(--brand)]/20" />
                  </div>
                  <blockquote className="text-[var(--ink)] text-base leading-relaxed flex-1">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="w-11 h-11 rounded-full bg-[var(--zellige)] text-white font-display font-bold flex items-center justify-center">
                      {r.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-bold text-[var(--ink)]">{r.name}</span>
                      <span className="block text-sm text-[var(--ink-soft)]">
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

      <section className="section-pad section-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
                Destinations
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--ink)]">
                Explore by city
              </h2>
            </div>
            <p className="text-[var(--ink-soft)] text-lg max-w-md">
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
                  className="group relative block aspect-[3/4] rounded-[12px] overflow-hidden shadow-[0_18px_40px_-18px_rgba(21,32,43,0.5)]"
                >
                  <Image
                    src={c.heroImage}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 75vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,18,24,0.9)] via-[rgba(12,18,24,0.25)] to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-2xl md:text-[28px] font-bold text-white leading-tight">
                      {c.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/80 line-clamp-2">{c.tagline}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--saffron)]">
                      Open guide
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 section-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <PartnerCta />
          </FadeIn>
        </div>
      </section>

      <section className="section-pad bg-[var(--ink)] text-white">
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
              className="inline-flex items-center gap-2 text-[var(--saffron)] font-semibold transition-colors duration-200 hover:text-white"
            >
              {t('browse_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>

          <div className="border-t border-white/15">
            {featured.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.1}>
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
                        <h3 className="font-display text-xl font-bold text-white group-hover/hover-img:text-[var(--saffron)] transition-colors duration-200">
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
                        className="inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-[var(--saffron)] transition-colors duration-200"
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

      <section className="section-pad section-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="mb-10">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--ink)] mb-3">
              {t('xp_title')}
            </h2>
            <p className="text-[var(--ink-soft)] max-w-xl text-lg">{t('xp_sub')}</p>
          </FadeIn>

          <Stagger className="grid md:grid-cols-3 gap-6 mb-12">
            {featuredXP.map((xp) => (
              <StaggerItem key={xp.id}>
                <ExperienceCard xp={xp} />
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn>
            <Link href="/experiences" className="btn-primary">
              {t('see_all_xp')} <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad section-white border-t border-[var(--ink)]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 md:gap-16">
          <FadeIn>
            <div className="card card-feature !bg-[#fafaf8]">
              <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
                Travelers
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-3">
                {t('early_title')}
              </h3>
              <p className="text-[var(--ink-soft)] mb-6 leading-relaxed">{t('early_text')}</p>
              <Link
                href="/early-access"
                className="inline-flex items-center gap-2 text-[var(--brand)] font-bold transition-all duration-200 hover:gap-3"
              >
                {t('early_cta')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="card card-feature !bg-[#fafaf8]">
              <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
                Partners
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-3">
                {t('partner_title')}
              </h3>
              <p className="text-[var(--ink-soft)] mb-6 leading-relaxed">{t('partner_text')}</p>
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 text-[var(--brand)] font-bold transition-all duration-200 hover:gap-3"
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
