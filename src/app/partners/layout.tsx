import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'List your business',
  description:
    'Get your restaurant, club, shop, quad tour, paragliding or desert camp featured on MoroccoMate. Reach travelers planning trips across Morocco.',
  path: '/partners',
  keywords: [
    'MoroccoMate partners',
    'list business Morocco',
    'feature restaurant Marrakech',
    'tour operator Morocco',
    'get listed Morocco travel app',
  ],
});

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
