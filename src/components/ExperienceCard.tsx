'use client';

import Image from 'next/image';
import { Check, Clock, MapPin, ExternalLink } from 'lucide-react';
import { mapsUrl, type Experience } from '@/data/places';
import { useI18n } from '@/lib/i18n';

export default function ExperienceCard({
  xp,
  layout = 'stack',
}: {
  xp: Experience;
  /** `row` puts the photo on the left from `sm` up; `stack` always keeps it on top. */
  layout?: 'stack' | 'row';
}) {
  const { t } = useI18n();
  const row = layout === 'row';

  return (
    <article
      className={`group h-full bg-white rounded-2xl overflow-hidden border border-[#2C3E50]/[0.07] shadow-[0_2px_10px_rgba(44,62,80,0.06)] hover:shadow-[0_18px_40px_-12px_rgba(44,62,80,0.28)] transition-shadow duration-300 flex flex-col ${
        row ? 'sm:flex-row' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden shrink-0 aspect-[4/3] ${
          row ? 'sm:aspect-auto sm:w-[42%] sm:min-h-[280px]' : ''
        }`}
      >
        <Image
          src={xp.image}
          alt={xp.title}
          fill
          sizes={row ? '(max-width: 640px) 100vw, 320px' : '(max-width: 768px) 100vw, 33vw'}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-[#2C3E50] backdrop-blur-sm">
          {xp.partnerType}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[#D93D3D]">
          {xp.city}
        </p>
        <h3 className="mt-1 text-lg sm:text-xl font-bold text-[#2C3E50] leading-snug">
          {xp.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {xp.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {xp.duration}
          </span>
        </div>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
          {xp.description}
        </p>

        {row && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {xp.included.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1 text-xs text-[#2C3E50] bg-[#FFFAF5] border border-[#E1B168]/40 rounded-full px-2.5 py-1"
              >
                <Check className="w-3 h-3 text-[#D93D3D]" />
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-5 flex items-center justify-between gap-3">
          <p className="font-bold text-base text-[#2C3E50] whitespace-nowrap">
            {xp.price}
          </p>
          <a
            href={mapsUrl(`${xp.title} ${xp.location}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D93D3D] hover:underline underline-offset-4 whitespace-nowrap"
          >
            {t('google_maps')} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
