'use client';

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
  type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';

type Props = {
  src: string;
  alt: string;
  children: ReactNode;
  className?: string;
};

/**
 * Editorial hover: floating place photo follows the cursor on desktop.
 * On coarse pointers (touch), a small thumbnail stays visible in the row.
 */
export default function HoverImageReveal({
  src,
  alt,
  children,
  className = '',
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onEnter = useCallback((e: MouseEvent) => {
    setActive(true);
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  const onLeave = useCallback(() => {
    setActive(false);
  }, []);

  // Keep preview inside the viewport
  const previewW = 280;
  const previewH = 200;
  const pad = 18;
  const left =
    typeof window !== 'undefined'
      ? Math.min(
          Math.max(pad, pos.x + 24),
          window.innerWidth - previewW - pad
        )
      : pos.x + 24;
  const top =
    typeof window !== 'undefined'
      ? Math.min(
          Math.max(pad, pos.y - previewH / 2),
          window.innerHeight - previewH - pad
        )
      : pos.y - previewH / 2;

  return (
    <div
      className={`group/hover-img relative ${className}`}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="flex items-start gap-4">
        {/* Touch / small screens: always show a thumb */}
        <div className="sm:hidden w-[4.5rem] h-[4.5rem] shrink-0 overflow-hidden rounded-md bg-[var(--paper-deep)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>

      {mounted &&
        active &&
        createPortal(
          <div
            aria-hidden
            className="pointer-events-none fixed z-[80] hidden sm:block overflow-hidden rounded-md border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-opacity duration-150"
            style={{
              left,
              top,
              width: previewW,
              height: previewH,
              opacity: active ? 1 : 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
          </div>,
          document.body
        )}
    </div>
  );
}
