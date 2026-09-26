'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SocialLinks from '@/components/SocialLinks';
import { useI18n } from '@/lib/i18n';

const HIDE_ON = ['/plan', '/itinerary', '/edit', '/feedback', '/test'];

export default function SiteFooter() {
  const pathname = usePathname();
  const { t } = useI18n();

  const hidden = HIDE_ON.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`)
  );
  if (hidden) return null;

  const links = [
    { href: '/discover', label: t('nav_discover') },
    { href: '/experiences', label: t('nav_experiences') },
    { href: '/plan', label: t('nav_plan') },
    { href: '/blog', label: t('nav_blog') },
    { href: '/early-access', label: t('nav_early') },
    { href: '/partners', label: t('nav_partners') },
  ];

  return (
    <footer className="no-texture bg-[var(--ink)] text-white py-14 mt-auto border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Image src="/images/logo-mark.png" alt="" width={350} height={412} className="w-auto h-10" />
          <span className="font-display text-xl font-bold tracking-tight">MoroccoMate</span>
        </div>
        <p className="text-[var(--saffron)] text-xl sm:text-2xl mb-2" dir="rtl" lang="ar">
          رحلتك تبدأ هنا
        </p>
        <p className="text-white/55 text-sm mb-6">{t('footer_line')}</p>

        <p className="text-white/40 text-xs uppercase tracking-[0.18em] mb-3">
          {t('follow_us')}
        </p>
        <SocialLinks className="mb-8" />

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/65 mb-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-white/45">
          <Link href="/marrakech" className="hover:text-white">
            Marrakech
          </Link>
          <Link href="/casablanca" className="hover:text-white">
            Casablanca
          </Link>
          <Link href="/rabat" className="hover:text-white">
            Rabat
          </Link>
          <Link href="/tangier" className="hover:text-white">
            Tangier
          </Link>
        </div>
      </div>
    </footer>
  );
}
