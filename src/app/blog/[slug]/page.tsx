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
    <div className="min-h-screen bg-pattern">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#D93D3D] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All guides
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
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
          <h1 className="text-3xl sm:text-5xl font-bold text-[#2C3E50] leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">{post.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#FCE8E8] text-[#D93D3D]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose-morocco space-y-8">
          {post.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="text-xl sm:text-2xl font-bold text-[#2C3E50] mb-3">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-gray-700 leading-relaxed mb-3 text-base sm:text-lg">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {post.cta && (
          <div className="mt-12 rounded-2xl bg-[#2C3E50] text-white p-6 sm:p-8 text-center">
            <p className="text-[#E1B168] text-sm font-bold uppercase tracking-wider mb-2">
              Next step
            </p>
            <Link
              href={post.cta.href}
              className="inline-flex items-center gap-2 bg-[#D93D3D] hover:bg-[#B83232] font-bold px-6 py-3 rounded-xl"
            >
              {post.cta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {related.length > 0 && (
          <aside className="mt-14 pt-8 border-t border-gray-200">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
              More guides
            </h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="font-semibold text-[#2C3E50] hover:text-[#D93D3D]"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </div>
  );
}
