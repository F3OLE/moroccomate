import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Book experiences in Morocco',
  description:
    'Book quad bikes, paragliding, hot air balloons, desert camps, hammams and partner tours in Morocco. Featured adventures travelers can actually do with MoroccoMate.',
  path: '/experiences',
  keywords: [
    'quad bike Marrakech',
    'paragliding Morocco',
    'hot air balloon Marrakech',
    'desert camp Morocco',
    'hammam Marrakech',
    'Morocco tours',
    'Morocco activities',
    'adventure Morocco',
  ],
});

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
