import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog';
import { FadeIn } from '@/components/FadeIn';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Morocco travel blog',
  description:
    'Local Morocco travel guides: avoid scams, plan 5 and 7 day trips, things to do in Marrakech, and more. Free tips from MoroccoMate.',
  path: '/blog',
  keywords: [
    'Morocco travel blog',
    'Morocco travel tips',
    'Marrakech guide',
    'Morocco itinerary',
    'avoid scams Morocco',
  ],
});

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <FadeIn>
          <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
            Blog
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--ink)] leading-[1.1] mb-4">
            Morocco travel guides
          </h1>
          <p className="text-[var(--ink-soft)] text-lg mb-12 max-w-xl leading-relaxed">
            Practical tips and itineraries for Marrakech, Casablanca, and beyond. Written
            for travelers who want real places, not filler lists.
          </p>
        </FadeIn>

        <div className="border-t border-[var(--ink)]/15">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-7 border-b border-[var(--ink)]/12"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--ink-soft)] mb-2">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  {post.city && (
                    <>
                      <span>·</span>
                      <span>{post.city}</span>
                    </>
                  )}
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-[var(--ink-soft)] mb-3 leading-relaxed max-w-xl">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[var(--brand)] font-semibold text-sm">
                  Read guide
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-14 border-t border-[var(--ink)]/12 pt-10">
          <p className="text-[var(--ink-soft)] mb-4">Ready to turn a guide into your dates?</p>
          <Link href="/plan" className="btn-primary inline-flex items-center gap-2">
            Plan a trip <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
