'use client';

import { useState, type ReactNode } from 'react';

type Props = {
  src: string;
  alt: string;
  children: ReactNode;
  className?: string;
  /** Dark rows (ink section) vs light rows (paper section). */
  tone?: 'dark' | 'light';
  /** CSS object-position — keeps the right part of the photo in frame */
  focus?: string;
};

/**
 * Place photo fades in inside the hovered row (fills the rectangle).
 */
export default function HoverImageReveal({
  src,
  alt,
  children,
  className = '',
  tone = 'dark',
  focus = 'center center',
}: Props) {
  const [on, setOn] = useState(false);

  const wash =
    tone === 'dark'
      ? 'radial-gradient(ellipse 90% 120% at 50% 45%, rgba(21,32,43,0.28) 0%, rgba(21,32,43,0.55) 55%, rgba(21,32,43,0.82) 100%)'
      : 'radial-gradient(ellipse 90% 120% at 50% 45%, rgba(243,239,232,0.2) 0%, rgba(243,239,232,0.55) 55%, rgba(243,239,232,0.85) 100%)';

  return (
    <div
      className={`relative isolate overflow-hidden rounded-md ${className}`}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocusCapture={() => setOn(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOn(false);
        }
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-out"
        style={{ opacity: on ? 1 : 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: focus }}
          loading="lazy"
          draggable={false}
        />
        <div className="absolute inset-0" style={{ background: wash }} />
      </div>

      <div
        className={`relative z-10 px-2 sm:px-3 transition-colors duration-300 ${
          on && tone === 'dark' ? 'drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
}
