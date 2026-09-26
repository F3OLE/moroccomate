'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { submitLead } from '@/lib/api';
import { useI18n } from '@/lib/i18n';

export const DISCOVER_UNLOCK_KEY = 'mm_discover_unlocked';

export function hasDiscoverAccess() {
  try {
    if (localStorage.getItem(DISCOVER_UNLOCK_KEY) === '1') return true;
    const early = JSON.parse(localStorage.getItem('mm_early_access') || '[]');
    return Array.isArray(early) && early.length > 0;
  } catch {
    return false;
  }
}

type Props = {
  previews: { image: string; name: string }[];
  lockedCount: number;
  city: string;
  onUnlocked: () => void;
};

export default function DiscoverGate({ previews, lockedCount, city, onUnlocked }: Props) {
  const { t } = useI18n();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') || '');
    setStatus('loading');
    setError('');
    try {
      await submitLead('early-access', {
        email,
        city: city === 'all' ? '' : city,
        message: 'Unlocked the Discover list',
      });
      localStorage.setItem(DISCOVER_UNLOCK_KEY, '1');
      setStatus('done');
      setTimeout(onUnlocked, 1400);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <div className="no-texture relative w-full max-w-lg overflow-hidden rounded-[16px] bg-[var(--ink)] text-white shadow-[0_30px_60px_-20px_rgba(21,32,43,0.6)]">
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--brand)]/25 blur-3xl"
        aria-hidden
      />
      <div className="relative p-6 sm:p-8">
        {status === 'done' ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-[var(--saffron)] mx-auto mb-3" />
            <p className="font-display text-2xl font-bold mb-1">{t('gate_done_title')}</p>
            <p className="text-white/65">{t('gate_done_sub')}</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="flex -space-x-3">
                {previews.slice(0, 4).map((p) => (
                  <span
                    key={p.name}
                    className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[var(--ink)]"
                  >
                    <Image src={p.image} alt="" fill sizes="44px" className="object-cover blur-[1.5px] scale-110" />
                  </span>
                ))}
                <span className="relative w-11 h-11 rounded-full ring-2 ring-[var(--ink)] bg-[var(--brand)] flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </span>
              </div>
              <p className="text-right leading-none">
                <span className="block font-display text-3xl font-bold text-[var(--saffron)] tabular-nums">
                  +{lockedCount}
                </span>
                <span className="text-[11px] uppercase tracking-[0.16em] text-white/50">
                  {t('gate_locked')}
                </span>
              </p>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight mb-2">
              {t('gate_title')}
            </h3>
            <p className="text-white/65 leading-relaxed mb-6">{t('gate_sub')}</p>

            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                name="email"
                type="email"
                required
                placeholder={t('gate_placeholder')}
                aria-label={t('email')}
                className="flex-1 min-w-0 rounded-[8px] bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[var(--saffron)]"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[var(--brand)] px-5 py-3 font-semibold transition-colors hover:bg-white hover:text-[var(--ink)] disabled:opacity-60"
              >
                {status === 'loading' ? t('submitting') : t('gate_cta')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {status === 'error' && (
              <p className="mt-2 text-sm text-[var(--saffron)]">{error}</p>
            )}
            <p className="mt-3 text-xs text-white/40">{t('gate_note')}</p>
          </>
        )}
      </div>
    </div>
  );
}
