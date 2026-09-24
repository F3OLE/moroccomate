'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Subtle parallax: background moves slower than scroll.
 * Respects prefers-reduced-motion.
 */
export default function HeroParallax({
  children,
  className = '',
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  /** How much of scrollY to apply (0.2–0.35 feels subtle). */
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        // Only while hero is roughly in view
        if (y > window.innerHeight * 1.2) return;
        el.style.transform = `translate3d(0, ${y * strength}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
