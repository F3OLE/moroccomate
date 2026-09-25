import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  getPost,
  getAllSlugs,
  postReadMinutes,
  sortedPosts,
} from '@/data/blog';
import { SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Post not found' };

  const url = absoluteUrl(`/blog/${post.slug}`);
  const imageUrl = absoluteUrl(post.cover.src);
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          alt: post.cover.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const minutes = postReadMinutes(post);
  const related = sortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: [absoluteUrl(post.cover.src)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/images/icon-512.png'),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] max-h-[70vh] bg-[var(--ink)] overflow-hidden">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: post.cover.focus || 'center' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(12,18,24,0.82) 0%, rgba(12,18,24,0.35) 48%, rgba(12,18,24,0.2) 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 max-w-3xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12 text-white">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            All guides
          </Link>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--saffron)] mb-3">
            {post.city || 'Morocco'}
            <span className="text-white/35 mx-2">·</span>
            {formatDate(post.publishedAt)}
            <span className="text-white/35 mx-2">·</span>
            {minutes} min read
          </p>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.05] max-w-3xl">
            {post.title}
          </h1>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <p className="text-xl sm:text-2xl text-[var(--ink)] leading-relaxed mb-6 font-medium">
          {post.description}
        </p>
        {post.cover.caption && (
          <p className="text-sm text-[var(--ink-soft)] italic mb-8 -mt-2">
            {post.cover.caption}
          </p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-10 pb-8 border-b border-[var(--ink)]/12">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--zellige)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-12">
          {post.sections.map((section, i) => (
            <section key={i} className="space-y-5">
              {section.heading && (
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ink)] leading-tight">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="text-[var(--ink)]/85 leading-[1.75] text-base sm:text-lg"
                >
                  {p}
                </p>
              ))}
              {section.image && (
                <figure className="pt-2">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-[var(--paper-deep)] media-zoom">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                      style={{
                        objectPosition: section.image.focus || 'center',
                      }}
                    />
                  </div>
                  {section.image.caption && (
                    <figcaption className="mt-3 text-sm text-[var(--ink-soft)] leading-relaxed">
                      {section.image.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </section>
          ))}
        </div>

        {post.cta && (
          <div className="mt-14 border-y border-[var(--ink)]/15 py-9 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-2">
                Next step
              </p>
              <p className="font-display text-xl font-bold text-[var(--ink)]">
                Keep the trip moving
              </p>
            </div>
            <Link
              href={post.cta.href}
              className="btn-primary inline-flex items-center gap-2 shrink-0"
            >
              {post.cta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {related.length > 0 && (
          <aside className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-6">
              Keep reading
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                  <div className="media-zoom relative aspect-[4/3] overflow-hidden rounded-md mb-3 bg-[var(--paper-deep)]">
                    <Image
                      src={r.cover.src}
                      alt={r.cover.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                      style={{ objectPosition: r.cover.focus || 'center' }}
                    />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--zellige)] mb-1">
                    {r.city || 'Morocco'}
                  </p>
                  <h3 className="font-display text-base font-bold text-[var(--ink)] leading-snug group-hover:text-[var(--brand)] transition-colors">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </article>
    </div>
  );
}
