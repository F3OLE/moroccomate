'use client';

import type { ReactNode } from 'react';

type Props = {
  src: string;
  alt: string;
  children: ReactNode;
  className?: string;
  /** Dark rows (ink section) vs light rows (paper section). */
  tone?: 'dark' | 'light';
};

/**
 * Image fades in inside the hovered row — not a floating popup.
 */
export default function HoverImageReveal({
  src,
  alt,
  children,
  className = '',
  tone = 'dark',
}: Props) {
  const wash =
    tone === 'dark'
      ? 'from-[rgba(21,32,43,0.55)] via-[rgba(21,32,43,0.72)] to-[rgba(21,32,43,0.9)]'
      : 'from-[rgba(243,239,232,0.4)] via-[rgba(243,239,232,0.78)] to-[rgba(243,239,232,0.94)]';

  return (
    <div
      className={`group/hover-img relative isolate overflow-hidden rounded-md ${className}`}
    >
      {/* Photo fills the row; fades in on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 scale-[1.04] transition-[opacity,transform] duration-500 ease-out group-hover/hover-img:opacity-100 group-hover/hover-img:scale-100 group-focus-within/hover-img:opacity-100 group-focus-within/hover-img:scale-100"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          draggable={false}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${wash}`} />
      </div>

      <div className="relative z-10 px-1 sm:px-2">{children}</div>
    </div>
  );
}
