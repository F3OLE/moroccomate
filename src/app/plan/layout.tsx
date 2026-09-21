import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'AI Morocco trip planner',
  description:
    'Plan a day-by-day Morocco itinerary with AI. Real restaurants, nightlife, shops and experiences in Marrakech, Casablanca, Rabat and Tangier — not vague filler.',
  path: '/plan',
  keywords: [
    'Morocco trip planner',
    'Morocco itinerary',
    'AI travel planner Morocco',
    'plan trip to Morocco',
    'Marrakech itinerary',
    'Casablanca itinerary',
    'day by day Morocco',
  ],
});

export default function PlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
