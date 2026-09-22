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
    <footer className="bg-[#1a2632] text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Image src="/images/logo.png" alt="" width={40} height={40} />
          <span className="text-xl font-bold">MoroccoMate</span>
        </div>
        <p className="text-[#E1B168] mb-2" dir="rtl" lang="ar">
          رحلتك تبدأ هنا
        </p>
        <p className="text-white/60 text-sm mb-4">{t('footer_line')}</p>

        <p className="text-white/45 text-xs uppercase tracking-wider mb-3">
          {t('follow_us')}
        </p>
        <SocialLinks className="mb-8" />

        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
