'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2 } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-pattern py-12">
      <div className="max-w-2xl mx-auto px-4">
        <FadeIn>
          <div className="card">
            <div className="w-12 h-12 rounded-full bg-[#FCE8E8] flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-[#D93D3D]" />
            </div>
            <h1 className="text-3xl font-bold text-gradient mb-2">{t('partners_page_title')}</h1>
            <p className="text-gray-600 mb-6">{t('partners_page_sub')}</p>

            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700 mb-8">
              {[
                t('benefit_1'),
                t('benefit_2'),
                t('benefit_3'),
                t('benefit_4'),
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D93D3D] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {status === 'done' ? (
              <div className="rounded-xl bg-green-50 border border-green-100 p-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <p className="font-semibold text-green-800 mb-1">{t('partners_done_title')}</p>
                <p className="text-sm text-green-700 mb-4">{t('partners_done_sub')}</p>
                <Link href="/experiences" className="text-[#D93D3D] font-semibold text-sm">
                  {t('see_xp_examples')}
                </Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact_name')}
                    </label>
                    <input name="name" required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('email')}
                    </label>
                    <input name="email" type="email" required className="input-field" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('business_name')}
                    </label>
                    <input name="businessName" required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('phone')}
                    </label>
                    <input name="phone" className="input-field" placeholder="+212…" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('city_region')}
                    </label>
                    <input name="city" required className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('tell_offer')}
                  </label>
                  <textarea name="message" rows={4} className="input-field" />
                </div>
                {status === 'error' && <p className="text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {status === 'loading' ? t('submitting') : t('register_featured')}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
