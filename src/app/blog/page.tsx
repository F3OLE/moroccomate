import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { postReadMinutes, sortedPosts } from '@/data/blog';
import { FadeIn } from '@/components/FadeIn';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Morocco travel blog',
  description:
    'Local Morocco travel guides with photos: Marrakech Short Film Festival week, Tanjazz in Tangier, scam-smart tips, and realistic itineraries from MoroccoMate.',
  path: '/blog',
  keywords: [
    'Morocco travel blog',
    'Morocco travel tips',
    'Marrakech guide',
    'Tangier Tanjazz',
    'Marrakech Short Film Festival',
    'Morocco itinerary',
    'avoid scams Morocco',
  ],
});

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogIndexPage() {
  const posts = sortedPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <FadeIn className="mb-10 md:mb-14 max-w-2xl">
          <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
            Field notes
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--ink)] leading-[1.05] mb-4">
            Morocco, written for people who actually go
          </h1>
          <p className="text-[var(--ink-soft)] text-lg leading-relaxed">
            Event weeks, honest streets, and day plans with real place photos —
            Marrakech, Tangier, and the rest of the map.
          </p>
        </FadeIn>

        {featured && (
          <FadeIn delay={0.05} className="mb-14 md:mb-16">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block media-zoom relative overflow-hidden rounded-md"
            >
              <div className="relative aspect-[16/10] sm:aspect-[21/9] bg-[var(--paper-deep)]">
                <Image
                  src={featured.cover.src}
                  alt={featured.cover.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  style={{ objectPosition: featured.cover.focus || 'center' }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(12,18,24,0.88) 0%, rgba(12,18,24,0.45) 42%, rgba(12,18,24,0.12) 100%)',
                  }}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--saffron)] mb-3">
                  {featured.city || 'Morocco'}
                  <span className="text-white/40 mx-2">·</span>
                  {formatDate(featured.publishedAt)}
                  <span className="text-white/40 mx-2">·</span>
                  {postReadMinutes(featured)} min
                </p>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.08] max-w-3xl mb-3 group-hover:text-[var(--saffron)] transition-colors duration-200">
                  {featured.title}
                </h2>
                <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-2xl mb-4 line-clamp-2 sm:line-clamp-3">
                  {featured.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  Read story
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </FadeIn>
        )}

        <FadeIn delay={0.08} className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            More guides
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12 border-t border-[var(--ink)]/12 pt-8">
          {rest.map((post, i) => (
            <FadeIn key={post.slug} delay={Math.min(0.1 + i * 0.08, 0.4)}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="media-zoom relative aspect-[16/10] overflow-hidden rounded-md mb-4 bg-[var(--paper-deep)]">
                  <Image
                    src={post.cover.src}
                    alt={post.cover.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: post.cover.focus || 'center' }}
                  />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--zellige)] mb-2">
                  {post.city || 'Morocco'}
                  <span className="text-[var(--ink)]/25 mx-1.5">·</span>
                  <span className="text-[var(--ink-soft)] font-semibold tracking-normal normal-case">
                    {formatDate(post.publishedAt)} · {postReadMinutes(post)} min
                  </span>
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] leading-snug mb-2 group-hover:text-[var(--brand)] transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-[var(--ink-soft)] text-sm leading-relaxed line-clamp-3 mb-3">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[var(--brand)] font-semibold text-sm">
                  Read
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-16 border-t border-[var(--ink)]/12 pt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-2">
              Next
            </p>
            <p className="font-display text-2xl font-bold text-[var(--ink)] mb-1">
              Turn a guide into your dates
            </p>
            <p className="text-[var(--ink-soft)] max-w-md leading-relaxed">
              Pick a city, interests, and length — get a day-by-day plan with Maps
              links.
            </p>
          </div>
          <Link href="/plan" className="btn-primary inline-flex items-center gap-2 shrink-0">
            Plan a trip <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
