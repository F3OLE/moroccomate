'use client';

import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import { SOCIAL_LINKS, type SocialNetwork } from '@/lib/social';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.8a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const LUCIDE: Partial<Record<SocialNetwork, LucideIcon>> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
};

type Props = {
  className?: string;
  /** Icon button size classes */
  size?: 'sm' | 'md';
};

export default function SocialLinks({ className = '', size = 'md' }: Props) {
  const box =
    size === 'sm'
      ? 'w-9 h-9 [&_svg]:w-4 [&_svg]:h-4'
      : 'w-11 h-11 [&_svg]:w-5 [&_svg]:h-5';

  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-3 ${className}`}
      aria-label="Social media"
    >
      {SOCIAL_LINKS.map((link) => {
        const Lucide = LUCIDE[link.id];
        const icon =
          link.id === 'tiktok' ? (
            <TikTokIcon className="w-5 h-5" />
          ) : link.id === 'x' ? (
            <XIcon className="w-5 h-5" />
          ) : Lucide ? (
            <Lucide className="w-5 h-5" strokeWidth={1.75} />
          ) : null;

        const baseClass = `${box} inline-flex items-center justify-center rounded-full border transition-colors`;

        if (!link.href) {
          return (
            <li key={link.id}>
              <span
                className={`${baseClass} border-white/30 text-white/55 cursor-default`}
                title={`${link.label} — coming soon`}
                aria-label={`${link.label} (coming soon)`}
              >
                {icon}
              </span>
            </li>
          );
        }

        return (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${baseClass} border-white/35 text-white hover:text-[#E1B168] hover:border-[#E1B168]/70 hover:bg-white/5`}
              aria-label={link.label}
              title={link.label}
            >
              {icon}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
