'use client';

/** Soft fade when navigating between routes — CSS only, no bounce. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-rise">{children}</div>;
}
