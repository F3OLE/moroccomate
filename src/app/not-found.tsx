import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CITY_HUBS } from '@/data/cities';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="bg-[var(--paper)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
            404
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--ink)] leading-[1.05]">
            Lost in the medina
          </h1>
          <p className="mt-5 text-[var(--ink-soft)] text-lg leading-relaxed max-w-md">
            This page doesn&apos;t exist, or it moved. Happens to the best of us in the souks.
            Here&apos;s the way back.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/" className="btn-primary">
              Back to home <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/discover"
              className="inline-flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-md border border-[var(--ink)]/20 text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
            >
              Discover places
            </Link>
          </div>

          <p className="mt-10 text-sm font-semibold text-[var(--ink)]">City guides</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {CITY_HUBS.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="text-sm px-3 py-1.5 rounded-full border border-[var(--ink)]/15 text-[var(--ink-soft)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden shadow-[0_20px_45px_-18px_rgba(21,32,43,0.45)]">
          <Image
            src="/images/places/souk-semmarine.jpg"
            alt="Souk Semmarine alley in the Marrakech medina"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
