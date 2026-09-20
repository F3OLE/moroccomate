'use client';

import Link from 'next/link';
import { ArrowRight, Building2 } from 'lucide-react';

interface PartnerCtaProps {
  variant?: 'light' | 'dark' | 'band';
}

/** Compact conversion strip for venues. */
export default function PartnerCta({ variant = 'band' }: PartnerCtaProps) {
  if (variant === 'band') {
    return (
      <div className="rounded-2xl border border-[#D93D3D]/25 bg-gradient-to-r from-[#FCE8E8] to-[#FFFAF5] px-5 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#D93D3D] text-white flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-[#2C3E50] text-lg leading-snug">
              Own a spot in Morocco?
            </p>
            <p className="text-sm text-[#2C3E50]/70 mt-0.5">
              Get a Partner badge and show up in traveler plans.
            </p>
          </div>
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
      <div className="rounded-2xl border border-[#E1B168]/35 bg-[#1a2632] px-5 py-6 sm:px-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <p className="font-bold text-white text-lg">Restaurant, club, or tour?</p>
          <p className="text-sm text-white/65 mt-1">
            Featured partners get priority in Discover and AI itineraries.
          </p>
        </div>
        <Link
          href="/partners"
          className="inline-flex items-center justify-center gap-2 bg-[#E1B168] text-[#2C3E50] font-bold px-5 py-3 rounded-xl hover:bg-[#d4a45c] shrink-0"
        >
          List your business
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center py-4">
      <Link href="/partners" className="text-[#D93D3D] font-semibold underline underline-offset-4">
        Own a business? Get featured on MoroccoMate
      </Link>
    </div>
  );
}
