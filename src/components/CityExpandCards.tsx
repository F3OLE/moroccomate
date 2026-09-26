'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { CityHub } from '@/data/cities';

/**
 * Homepage "Explore by city" row. Hover (mouse) or first tap (touch) expands a card;
 * sizing and fades are pure CSS (`.city-row` / `.city-card` / `.city-tags` in globals.css).
 */
export default function CityExpandCards({ cities }: { cities: CityHub[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="city-row -mx-4 px-4 md:mx-0 md:px-0 pb-2">
      {cities.map((c) => (
        <Link
          key={c.slug}
          href={`/${c.slug}`}
          data-active={active === c.slug}
          onClick={(e) => {
            if (active === c.slug) return;
            if (!window.matchMedia('(hover: none)').matches) return;
            e.preventDefault();
            setActive(c.slug);
            e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
          }}
          className="city-card group snap-start rounded-[12px] overflow-hidden shadow-[0_18px_40px_-18px_rgba(21,32,43,0.5)]"
        >
          <Image
            src={c.heroImage}
            alt={c.name}
            fill
            sizes="(max-width: 768px) 88vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ objectPosition: c.heroFocus || 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,18,24,0.9)] via-[rgba(12,18,24,0.25)] to-transparent" />

          <ul className="city-tags absolute top-4 left-4 right-4 flex flex-wrap gap-2">
            {c.highlights.map((tag) => (
              <li
                key={tag}
                className="whitespace-nowrap text-xs font-semibold text-white bg-black/35 backdrop-blur-sm border border-white/25 rounded-full px-3 py-1"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-display text-2xl md:text-[28px] font-bold text-white leading-tight">
              {c.name}
            </h3>
            <p className="mt-1 text-sm text-white/80 line-clamp-2">{c.tagline}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--saffron)] whitespace-nowrap">
              Open guide
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
