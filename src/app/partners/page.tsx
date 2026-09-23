'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import { submitLead } from '@/lib/api';
import { useI18n } from '@/lib/i18n';

const businessTypes = [
  'Restaurant / café',
  'Club / nightlife',
  'Shop / souk stall / boutique',
  'Quad / buggy tours',
  'Paragliding / sky sports',
  'Hot air balloon',
  'Desert camp / camel treks',
  'Hammam / spa',
  'Guided tours',
  'Other experience',
];

export default function PartnersPage() {
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
      phone: String(form.get('phone') || ''),
      businessName: String(form.get('businessName') || ''),
      businessType: String(form.get('businessType') || ''),
      city: String(form.get('city') || ''),
      message: String(form.get('message') || ''),
    };

    try {
      await submitLead('partner', payload);
      const existing = JSON.parse(localStorage.getItem('mm_partners') || '[]');
      existing.push({ ...payload, at: new Date().toISOString() });
      localStorage.setItem('mm_partners', JSON.stringify(existing));
      // Do not call e.currentTarget.reset() after await — React clears
      // currentTarget, which threw and showed a false error after success.
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  const benefits = [t('benefit_1'), t('benefit_2'), t('benefit_3'), t('benefit_4')];

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <FadeIn>
          <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
            Partners
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--ink)] leading-[1.1] mb-3">
            {t('partners_page_title')}
          </h1>
          <p className="text-[var(--ink-soft)] text-lg leading-relaxed mb-8">
            {t('partners_page_sub')}
          </p>

          <ul className="border-y border-[var(--ink)]/12 py-6 mb-10 space-y-3">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[var(--ink)]">
                <Check className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          {status === 'done' ? (
            <div className="border-y border-[var(--zellige)]/35 py-8">
              <p className="font-display text-xl font-bold text-[var(--ink)] mb-1">
                {t('partners_done_title')}
              </p>
              <p className="text-[var(--ink-soft)] mb-6">{t('partners_done_sub')}</p>
              <Link
                href="/experiences"
                className="inline-flex items-center gap-2 text-[var(--brand)] font-bold"
              >
                {t('see_xp_examples')}
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)] mb-1.5">
                    {t('contact_name')}
                  </label>
                  <input name="name" required className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)] mb-1.5">
                    {t('email')}
                  </label>
                  <input name="email" type="email" required className="input-field" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)] mb-1.5">
                    {t('business_name')}
                  </label>
                  <input name="businessName" required className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)] mb-1.5">
                    {t('phone')}
                  </label>
                  <input name="phone" className="input-field" placeholder="+212…" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)] mb-1.5">
                    {t('type')}
                  </label>
                  <select name="businessType" required className="input-field" defaultValue="">
                    <option value="" disabled>
                      …
                    </option>
                    {businessTypes.map((bt) => (
                      <option key={bt} value={bt}>
                        {bt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)] mb-1.5">
                    {t('city_region')}
                  </label>
                  <input name="city" required className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)] mb-1.5">
                  {t('tell_offer')}
                </label>
                <textarea name="message" rows={4} className="input-field" />
              </div>
              {status === 'error' && (
                <p className="text-sm text-[var(--brand)] font-medium">{error}</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full disabled:opacity-60"
              >
                {status === 'loading' ? t('submitting') : t('register_featured')}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
