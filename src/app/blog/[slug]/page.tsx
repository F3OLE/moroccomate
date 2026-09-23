import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BLOG_POSTS, getPost, getAllSlugs } from '@/data/blog';
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
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
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
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All guides
        </Link>

        <header className="mb-10 pb-8 border-b border-[var(--ink)]/12">
          <div className="flex flex-wrap gap-2 text-xs text-[var(--ink-soft)] mb-3">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
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
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[var(--ink)] leading-[1.1] mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-[var(--ink-soft)] leading-relaxed mb-5">
            {post.description}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--zellige)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="space-y-8">
          {post.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] mb-3">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="text-[var(--ink-soft)] leading-relaxed mb-3 text-base sm:text-lg"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {post.cta && (
          <div className="mt-12 border-y border-[var(--ink)]/15 py-8">
            <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
              Next step
            </p>
            <Link
              href={post.cta.href}
              className="btn-primary inline-flex items-center gap-2"
            >
              {post.cta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {related.length > 0 && (
          <aside className="mt-14 pt-8 border-t border-[var(--ink)]/12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-4">
              More guides
            </p>
            <div className="border-t border-[var(--ink)]/10">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-4 border-b border-[var(--ink)]/12"
                >
                  <span className="font-display font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                    {r.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[var(--brand)] shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </aside>
        )}
      </article>
    </div>
  );
}
