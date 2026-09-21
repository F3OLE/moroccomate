import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Discover places in Morocco',
  description:
    'Browse real restaurants, clubs, nightlife, cafés, souks, shops and landmarks across Marrakech, Casablanca, Rabat and Tangier. Open any spot in Google Maps with MoroccoMate.',
  path: '/discover',
  keywords: [
    'Morocco restaurants',
    'Marrakech nightlife',
    'Casablanca cafes',
    'Rabat restaurants',
    'Tangier places',
    'Morocco landmarks',
    'souks Marrakech',
    'things to do Marrakech',
  ],
});

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
