'use client';

import { LanguageProvider, useI18n, type Lang } from '@/lib/i18n';

const options: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'fr', label: 'FR' },
  { id: 'es', label: 'ES' },
];

export function LanguageSwitcher({
  dark = false,
  compact = false,
}: {
  dark?: boolean;
  compact?: boolean;
}) {
  const { lang, setLang } = useI18n();
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.id === lang)
  );

  return (
    <div
      className={`lang-switch relative inline-grid grid-cols-3 items-center font-bold ${
        compact ? 'text-[10px] p-0.5' : 'text-xs p-0.5'
      } ${
        dark
          ? 'border border-white/25 bg-white/10 text-white'
          : 'border border-[var(--ink)]/15 bg-white/70 text-[var(--ink)]'
      }`}
      style={{ borderRadius: '999px' }}
      role="group"
      aria-label="Language"
    >
      <span
        aria-hidden
        className="lang-switch-pill absolute inset-y-0.5 rounded-full bg-[var(--brand)] transition-transform duration-300 ease-out"
        style={{
          width: `calc((100% - 4px) / 3)`,
          left: 2,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setLang(opt.id)}
          className={`relative z-10 rounded-full transition-colors duration-200 ${
            compact ? 'px-2 py-1' : 'px-2.5 py-1'
          } ${
            lang === opt.id
              ? 'text-white'
              : dark
                ? 'text-white/70 hover:text-white'
                : 'text-[var(--ink-soft)] hover:text-[var(--brand)]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
