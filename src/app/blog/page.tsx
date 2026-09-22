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
    <div className="min-h-screen bg-pattern">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <FadeIn>
          <p className="text-[#D93D3D] font-semibold text-sm uppercase tracking-wider mb-2">
            Blog
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-3">
            Morocco travel guides
          </h1>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Practical tips and itineraries for Marrakech, Casablanca, and beyond.
            Written for travelers who want real places, not filler lists.
          </p>
        </FadeIn>

        <div className="space-y-4">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.05}>
              <article className="card hover:border-[#D93D3D]/30 transition-colors">
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
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
                  <h2 className="text-xl sm:text-2xl font-bold text-[#2C3E50] group-hover:text-[#D93D3D] transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[#D93D3D] font-semibold text-sm">
                    Read guide
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Ready to turn a guide into your dates?</p>
          <Link href="/plan" className="btn-primary inline-flex items-center gap-2">
            Plan a trip <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
