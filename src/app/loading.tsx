'use client';

import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-pattern">
      <div className="flex flex-col items-center gap-5 w-full max-w-xs px-6">
        <Image
          src="/images/logo.png"
          alt=""
          width={64}
          height={64}
          className="w-14 h-14 hero-fade"
          priority
        />
        <div className="w-full space-y-2">
          <div className="skeleton-light h-3 w-full" />
          <div className="skeleton-light h-3 w-4/5 mx-auto" />
        </div>
        <p className="text-sm text-[var(--ink-soft)] tracking-wide">Loading</p>
      </div>
    </div>
  );
}
