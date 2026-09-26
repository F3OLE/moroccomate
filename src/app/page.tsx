'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ChevronDown,
  Coins,
  ExternalLink,
  Globe,
  Landmark,
  MapPin,
  Quote,
  Star,
} from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/FadeIn';
import HoverImageReveal from '@/components/HoverImageReveal';
import ExperienceCard from '@/components/ExperienceCard';
import CountUp from '@/components/CountUp';
import CityExpandCards from '@/components/CityExpandCards';
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

const STATS = [
  { icon: MapPin, to: 100, suffix: '+', label: 'places mapped' },
  { icon: Landmark, to: 6, suffix: '', label: 'cities' },
  { icon: Coins, to: 100, suffix: '%', label: 'local prices' },
  { icon: Globe, to: 30, suffix: '+', label: 'unique experiences' },
];

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
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="hero-zoom absolute inset-0">
          <Image
            src="/images/hero-kasbah.jpg"
            alt="Mud-brick kasbah and palm oasis in southern Morocco at golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.7)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white" aria-hidden />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          <h1 className="hero-fade font-display text-[48px] md:text-[72px] font-bold text-white tracking-[-0.02em] leading-none">
            MoroccoMate
          </h1>
          <p className="hero-fade-delay-1 mt-2 text-[20px] text-white/80">
            {t('hero_tagline')}
          </p>

          <div className="hero-fade-delay-2 mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              href="/plan"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-[var(--ink)] font-semibold rounded-[8px] px-8 py-4 transition-colors duration-200 hover:bg-white/90"
            >
              {t('hero_plan')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/discover"
              className="inline-flex items-center justify-center w-full sm:w-auto border border-white text-white font-semibold rounded-[8px] px-8 py-4 transition-colors duration-200 hover:bg-white/10"
            >
              {t('hero_discover')}
            </Link>
          </div>
        </div>

        <a
          href="#features"
          aria-label="Scroll down"
          className="hero-fade-delay-3 absolute bottom-24 left-1/2 -translate-x-1/2 z-10 text-white"
        >
          <ChevronDown className="scroll-cue w-8 h-8" strokeWidth={1.75} />
        </a>
      </section>

      <section id="features" className="relative section-pad section-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center text-center">
                  <s.icon className="w-6 h-6 text-[var(--brand)]" strokeWidth={1.75} />
                  <CountUp
                    to={s.to}
                    suffix={s.suffix}
                    className="mt-3 font-display text-[32px] md:text-[36px] font-bold text-[var(--ink)] leading-none"
                  />
                  <p className="mt-2 text-[13px] text-gray-500">{s.label}</p>
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
          <FadeIn>
            <CityExpandCards cities={CITY_HUBS} />
          </FadeIn>
        </div>
      </section>

      <section className="py-12 md:py-16 section-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <PartnerCta />
          </FadeIn>
        </div>
      </section>

      <section className="no-texture section-pad bg-[var(--ink)] text-white">
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
