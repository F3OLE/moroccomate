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

  return (
    <div
      className={`inline-flex items-center rounded-full border font-bold ${
        compact ? 'p-0.5 text-[10px]' : 'p-0.5 text-xs'
      } ${
        dark
          ? 'border-white/25 bg-white/10 text-white'
          : 'border-white/50 bg-white/40 text-[#2C3E50]'
      }`}
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      role="group"
      aria-label="Language"
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setLang(opt.id)}
          className={`rounded-full transition-colors ${
            compact ? 'px-2 py-1' : 'px-2.5 py-1'
          } ${
            lang === opt.id
              ? 'bg-[#D93D3D] text-white'
              : dark
                ? 'text-white/70 hover:text-white'
                : 'text-[#2C3E50]/55 hover:text-[#D93D3D]'
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
