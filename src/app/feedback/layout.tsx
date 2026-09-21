import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Feedback',
  description: 'Share feedback about your MoroccoMate trip and places you visited.',
  path: '/feedback',
  keywords: ['MoroccoMate feedback'],
});

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
