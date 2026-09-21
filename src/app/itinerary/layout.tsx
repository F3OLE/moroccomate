import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Your Morocco itinerary',
  description:
    'View and refine your MoroccoMate day-by-day itinerary with real places and experiences across Morocco.',
  path: '/itinerary',
  keywords: [
    'Morocco itinerary',
    'trip plan Morocco',
    'MoroccoMate itinerary',
  ],
});

export default function ItineraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
