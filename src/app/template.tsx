'use client';

/** Pass-through — no route transition flash on first paint / navigation. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
