export type SocialNetwork =
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'youtube'
  | 'x'
  | 'linkedin';

export type SocialLink = {
  id: SocialNetwork;
  label: string;
  /** Empty string = show icon as “coming soon” until you set the env var. */
  href: string;
};

function envUrl(name: string): string {
  const value = process.env[name]?.trim() ?? '';
  if (!value || value === '#') return '';
  return value;
}

/**
 * MoroccoMate social profiles.
 * Set NEXT_PUBLIC_SOCIAL_* in Vercel / .env.local when accounts are ready.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: envUrl('NEXT_PUBLIC_SOCIAL_INSTAGRAM'),
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: envUrl('NEXT_PUBLIC_SOCIAL_TIKTOK'),
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: envUrl('NEXT_PUBLIC_SOCIAL_FACEBOOK'),
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: envUrl('NEXT_PUBLIC_SOCIAL_YOUTUBE'),
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    href: envUrl('NEXT_PUBLIC_SOCIAL_X'),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: envUrl('NEXT_PUBLIC_SOCIAL_LINKEDIN'),
  },
];

/** URLs ready for schema.org sameAs (only filled profiles). */
export function socialSameAs(): string[] {
  return SOCIAL_LINKS.map((l) => l.href).filter(Boolean);
}
