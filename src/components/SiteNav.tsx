'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LanguageSwitcher } from '@/components/Providers';
import { useI18n } from '@/lib/i18n';

const DARK_ROUTES = ['/plan', '/itinerary', '/edit', '/feedback'];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();

  const isHome = pathname === '/';
  const isDarkRoute =
    DARK_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));

  const overHero = isHome && !scrolled;
  const lightChrome = isDarkRoute || overHero;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(
        pathname === '/' ? window.scrollY > window.innerHeight - 64 : window.scrollY > 24
      );
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = [
    { href: '/discover', label: t('nav_discover') },
    { href: '/experiences', label: t('nav_experiences') },
    { href: '/plan', label: t('nav_plan') },
    { href: '/early-access', label: t('nav_early') },
    { href: '/partners', label: t('nav_partners') },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-[background-color,border-color,color,box-shadow] duration-300 ${
        overHero
          ? 'border-transparent bg-transparent text-white'
          : isDarkRoute
            ? 'border-white/15 bg-[rgba(12,18,24,0.35)] text-white'
            : 'border-[var(--ink)]/10 bg-white/95 text-[var(--ink)] shadow-[0_1px_12px_rgba(21,32,43,0.06)]'
      }`}
      style={
        lightChrome
          ? undefined
          : {
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }
      }
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Link href="/" className="flex items-center gap-2 shrink-0 min-w-0 justify-self-start">
          <Image
            src="/images/logo-mark.png"
            alt="MoroccoMate"
            width={350}
            height={412}
            priority
            className={`w-7 sm:w-8 shrink-0 transition-[filter] duration-300 ${
              overHero ? 'brightness-0 invert' : ''
            }`}
          />
          <span
            className={`font-display font-bold tracking-tight text-sm sm:text-base truncate ${
              lightChrome ? 'text-white' : 'text-[var(--brand)]'
            }`}
          >
            MoroccoMate
          </span>
        </Link>

        <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors whitespace-nowrap ${
                pathname === l.href
                  ? 'text-[var(--brand)]'
                  : lightChrome
                    ? 'text-white/75 hover:text-white'
                    : 'text-[var(--ink-soft)] hover:text-[var(--brand)]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center justify-self-end gap-3">
          <LanguageSwitcher dark={lightChrome} />
          <Link href="/plan" className="btn-primary !py-2 !px-4 text-sm">
            {t('nav_start')}
          </Link>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden justify-self-end">
          <LanguageSwitcher dark={lightChrome} compact />
          <button
            type="button"
            className={`p-2 rounded-md ${
              lightChrome ? 'text-white hover:bg-white/10' : 'text-[var(--ink)] hover:bg-black/5'
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`menu-icon ${open ? 'is-open' : ''}`} aria-hidden>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          className={`lg:hidden border-t px-4 py-4 space-y-1 max-h-[calc(100dvh-3.5rem)] overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))] ${
            lightChrome
              ? 'border-white/10 bg-[rgba(12,18,24,0.92)] text-white'
              : 'border-[var(--ink)]/10 bg-[var(--paper)] text-[var(--ink)]'
          }`}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-3 px-3 rounded-md text-base font-medium ${
                pathname === l.href
                  ? 'bg-[var(--brand)]/15 text-[var(--brand)]'
                  : lightChrome
                    ? 'hover:bg-white/10'
                    : 'hover:bg-black/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/plan"
            onClick={() => setOpen(false)}
            className="btn-primary flex justify-center text-sm mt-3 w-full"
          >
            {t('nav_start')}
          </Link>
        </div>
      )}
    </header>
  );
}

/** Reserves space under the fixed nav on light pages (home/dark scenes bleed under it). */
export function NavSpacer() {
  const pathname = usePathname();
  const bleedUnderNav =
    pathname === '/' ||
    ['/plan', '/itinerary', '/edit'].some(
      (r) => pathname === r || pathname.startsWith(`${r}/`)
    );

  if (bleedUnderNav) return null;
  return <div className="h-14 sm:h-16" aria-hidden />;
}
