'use client';

import { useEffect, useRef, useState } from 'react';

function Leg({ x, y, phase, far }: { x: number; y: number; phase: 'a' | 'b'; far?: boolean }) {
  return (
    <g className={`camel-leg camel-leg-${phase}`} fill={far ? '#3b4754' : 'var(--ink)'}>
      <rect x={x - 2.75} y={y} width="5.5" height="54" rx="2.75" />
      <circle cx={x} cy={y + 27} r="3.6" />
      <ellipse cx={x + 2} cy={y + 54} rx="6" ry="2.6" />
    </g>
  );
}

function CamelSvg() {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-auto" fill="var(--ink)" aria-hidden>
      <Leg x={68} y={78} phase="b" far />
      <Leg x={122} y={78} phase="a" far />
      <g className="camel-bob">
        <path d="M54 70 Q44 78 47 94" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="47" cy="96" rx="2.2" ry="4" />
        <ellipse cx="97" cy="74" rx="46" ry="15" />
        <path d="M64 70 Q70 26 97 26 Q122 27 130 68 Z" />
        <path d="M71 56 Q77 29 97 28 Q118 29 124 56 L127 66 Q97 59 67 66 Z" fill="var(--brand)" />
        <path d="M69 61 Q97 53 126 61" stroke="var(--saffron)" strokeWidth="2" fill="none" />
        <path d="M77 45 Q97 37 118 45" stroke="var(--saffron)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        <circle cx="67" cy="67" r="2.2" fill="var(--saffron)" />
        <circle cx="127" cy="67" r="2.2" fill="var(--saffron)" />
        <g className="camel-nod">
          <path d="M134 72 Q156 80 159 60 Q161 44 169 38" stroke="var(--ink)" strokeWidth="11" fill="none" strokeLinecap="round" />
          <ellipse cx="178" cy="41" rx="15" ry="6.5" transform="rotate(18 178 41)" />
          <path d="M167 35 l-2 -7 l5 4 z" />
          <circle cx="173" cy="37" r="1.3" fill="var(--paper)" />
        </g>
      </g>
      <Leg x={76} y={80} phase="a" />
      <Leg x={130} y={80} phase="b" />
    </svg>
  );
}

/** Dromedary that strolls across once its track scrolls into view. */
export default function WalkingCamel({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`camel-track pointer-events-none ${className}`} aria-hidden>
      <div className="absolute inset-x-0 bottom-1 border-b-2 border-dashed border-[var(--saffron)]/40" />
      {started && (
        <div className="camel-walker absolute bottom-0 w-[120px] md:w-[140px]">
          <CamelSvg />
        </div>
      )}
    </div>
  );
}
