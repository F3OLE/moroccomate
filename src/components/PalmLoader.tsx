/** Little swaying palm trees for itinerary build loading. */
export default function PalmLoader({
  label = 'Building your trip',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`} role="status" aria-live="polite">
      <div className="palm-loader" aria-hidden>
        <PalmSvg className="palm-loader-tree palm-loader-tree-1" />
        <PalmSvg className="palm-loader-tree palm-loader-tree-2" />
        <PalmSvg className="palm-loader-tree palm-loader-tree-3" />
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}

function PalmSvg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 110"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="40" cy="104" rx="18" ry="4" opacity="0.28" />
      <path d="M39 102 V42" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M40 44 C18 34 8 18 12 6 C22 14 32 28 40 44 Z" />
      <path d="M40 42 C22 24 24 6 32 2 C36 16 38 30 40 42 Z" />
      <path d="M40 41 C38 18 48 4 58 2 C52 16 44 30 40 41 Z" />
      <path d="M41 43 C56 30 68 18 70 8 C60 16 48 30 41 43 Z" />
      <path d="M41 45 C62 42 74 34 76 24 C64 32 50 40 41 45 Z" />
      <path d="M38 45 C18 48 8 40 6 28 C16 34 28 42 38 45 Z" />
    </svg>
  );
}
