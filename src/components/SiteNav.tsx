'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
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

  // Over the home hero (or dark plan pages): light text on clear glass
  const lightChrome = isDarkRoute || (isHome && !scrolled);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    { href: '/blog', label: t('nav_blog') },
    { href: '/early-access', label: t('nav_early') },
    { href: '/partners', label: t('nav_partners') },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-[background-color,border-color] duration-300 ${
        lightChrome
          ? 'border-white/20 bg-white/[0.08] text-white'
          : 'border-white/35 bg-white/25 text-[#2C3E50]'
      }`}
      style={{
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 shrink-0 min-w-0">
          <Image
            src="/images/logo.png"
            alt="MoroccoMate"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
          />
          <span
            className={`font-bold tracking-tight text-sm sm:text-base truncate ${
              lightChrome ? 'text-white' : 'text-[#D93D3D]'
            }`}
          >
            MoroccoMate
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors whitespace-nowrap ${
                pathname === l.href
                  ? 'text-[#D93D3D]'
                  : lightChrome
                    ? 'text-white/75 hover:text-white'
                    : 'text-[#2C3E50]/70 hover:text-[#D93D3D]'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <LanguageSwitcher dark={lightChrome} />
          <Link href="/plan" className="btn-primary !py-2 !px-4 text-sm">
            {t('nav_start')}
          </Link>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
          <LanguageSwitcher dark={lightChrome} compact />
          <button
            type="button"
            className={`p-2 rounded-lg ${
              lightChrome ? 'text-white hover:bg-white/10' : 'text-[#2C3E50] hover:bg-black/5'
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className={`lg:hidden border-t px-4 py-4 space-y-1 max-h-[calc(100dvh-3.5rem)] overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))] ${
            lightChrome
              ? 'border-white/10 bg-[#1a1520]/70 text-white'
              : 'border-white/30 bg-white/60 text-[#2C3E50]'
          }`}
          style={{
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-3 px-3 rounded-xl text-base font-medium ${
                pathname === l.href
                  ? 'bg-[#D93D3D]/15 text-[#D93D3D]'
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
