'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import { submitLead } from '@/lib/api';
import { useI18n } from '@/lib/i18n';

export default function EarlyAccessPage() {
  const { t } = useI18n();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      city: String(form.get('city') || ''),
      message: String(form.get('message') || ''),
    };

    try {
      await submitLead('early-access', payload);
      const existing = JSON.parse(localStorage.getItem('mm_early_access') || '[]');
      existing.push({ ...payload, at: new Date().toISOString() });
      localStorage.setItem('mm_early_access', JSON.stringify(existing));
      // Do not call e.currentTarget.reset() after await — React clears
      // currentTarget, which threw and showed a false error after success.
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <FadeIn>
          <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
            Travelers
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--ink)] leading-[1.1] mb-3">
            {t('early_page_title')}
          </h1>
          <p className="text-[var(--ink-soft)] text-lg leading-relaxed mb-10">
            {t('early_page_sub')}
          </p>

          {status === 'done' ? (
            <div className="border-y border-[var(--zellige)]/35 py-8">
              <CheckCircle2 className="w-8 h-8 text-[var(--zellige)] mb-3" />
              <p className="font-display text-2xl font-bold text-[var(--ink)] mb-2">
                {t('early_done_title')}
              </p>
              <p className="text-[var(--ink-soft)] mb-6">{t('early_done_sub')}</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--brand)] font-bold"
              >
                {t('back_home')}
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5 border-t border-[var(--ink)]/12 pt-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)] mb-1.5">
                  {t('name')}
                </label>
                <input name="name" required className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)] mb-1.5">
                  {t('email')}
                </label>
                <input name="email" type="email" required className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)] mb-1.5">
                  {t('city_care')}
                </label>
                <select name="city" className="input-field" defaultValue="marrakesh">
                  <option value="marrakesh">Marrakech</option>
                  <option value="casablanca">Casablanca</option>
                  <option value="rabat">Rabat</option>
                  <option value="tangier">Tangier</option>
                  <option value="both">{t('both_cities')}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)] mb-1.5">
                  {t('want_most')}
                </label>
                <textarea name="message" rows={3} className="input-field" />
              </div>
              {status === 'error' && (
                <p className="text-sm text-[var(--brand)] font-medium">{error}</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full disabled:opacity-60"
              >
                {status === 'loading' ? t('submitting') : t('join_early')}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
