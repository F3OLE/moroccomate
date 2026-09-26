import type { Metadata } from 'next';
import Image from 'next/image';
import { PLACES, EXPERIENCES } from '@/data/places';
import { BLOG_POSTS } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Photo credits',
  description: 'Photographers and licenses for the images used on MoroccoMate.',
};

type Credit = { src: string; label: string; credit: string };

function collectCredits(): Credit[] {
  const all: Credit[] = [
    ...PLACES.filter((p) => p.imageCredit).map((p) => ({
      src: p.image,
      label: p.name,
      credit: p.imageCredit!,
    })),
    ...EXPERIENCES.filter((x) => x.imageCredit).map((x) => ({
      src: x.image,
      label: x.title,
      credit: x.imageCredit!,
    })),
    ...BLOG_POSTS.flatMap((post) =>
      [post.cover, ...post.sections.map((s) => s.image)]
        .filter((img) => img?.credit)
        .map((img) => ({ src: img!.src, label: img!.alt, credit: img!.credit! }))
    ),
  ];
  const seen = new Set<string>();
  return all.filter((c) => {
    const file = c.src.split('/').pop()!;
    if (seen.has(file)) return false;
    seen.add(file);
    return true;
  });
}

export default function CreditsPage() {
  const credits = collectCredits();

  return (
    <div className="bg-[var(--paper)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
          Thank you
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--ink)] leading-[1.05]">
          Photo credits
        </h1>
        <p className="mt-5 text-[var(--ink-soft)] text-lg leading-relaxed max-w-2xl">
          Some photos on MoroccoMate come from photographers who share their work under Creative
          Commons licenses on Wikimedia Commons. They are credited below. Photos may be cropped or
          resized.
        </p>

        <ul className="mt-10 border-t border-[var(--ink)]/12">
          {credits.map((c) => (
            <li
              key={c.src}
              className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6rem_1fr] gap-4 items-center py-4 border-b border-[var(--ink)]/12"
            >
              <div className="relative aspect-square rounded-md overflow-hidden bg-[var(--paper-deep)]">
                <Image src={c.src} alt="" fill sizes="96px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[var(--ink)] truncate">{c.label}</p>
                <p className="text-sm text-[var(--ink-soft)]">Photo: {c.credit}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
