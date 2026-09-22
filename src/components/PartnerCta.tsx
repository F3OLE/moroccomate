'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface PartnerCtaProps {
  variant?: 'light' | 'dark' | 'band';
}

/** Compact conversion strip for venues. */
export default function PartnerCta({ variant = 'band' }: PartnerCtaProps) {
  if (variant === 'band') {
    return (
      <div className="border-y border-[var(--brand)]/30 py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="min-w-0">
          <p className="font-display font-bold text-[var(--ink)] text-xl leading-snug">
            Own a spot in Morocco?
          </p>
          <p className="text-sm text-[var(--ink-soft)] mt-1">
            Get a Partner badge and show up in traveler plans.
          </p>
        </div>
        <Link
          href="/partners"
          className="btn-primary inline-flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto"
        >
          Become a partner
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (variant === 'dark') {
    return (
      <div className="border-y border-[var(--saffron)]/40 py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <p className="font-display font-bold text-white text-xl">Restaurant, club, or tour?</p>
          <p className="text-sm text-white/65 mt-1">
            Featured partners get priority in Discover and AI itineraries.
          </p>
        </div>
        <Link
          href="/partners"
          className="inline-flex items-center justify-center gap-2 bg-[var(--saffron)] text-[var(--ink)] font-bold px-5 py-3 rounded-md hover:brightness-110 shrink-0"
        >
          List your business
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center py-4">
      <Link
        href="/partners"
        className="text-[var(--brand)] font-semibold underline underline-offset-4"
      >
        Own a business? Get featured on MoroccoMate
      </Link>
    </div>
  );
}
