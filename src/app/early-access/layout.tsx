import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Early access waitlist',
  description:
    'Join the MoroccoMate early access waitlist. Be first when traveler features and the full Morocco travel app open up.',
  path: '/early-access',
  keywords: [
    'MoroccoMate waitlist',
    'Morocco travel app',
    'MoroccoMate early access',
  ],
});

export default function EarlyAccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
