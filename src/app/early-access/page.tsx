'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Mail } from 'lucide-react';
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
      setStatus('done');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <div className="min-h-screen bg-pattern py-12">
      <div className="max-w-xl mx-auto px-4">
        <FadeIn>
          <div className="card">
            <div className="w-12 h-12 rounded-full bg-[#FCE8E8] flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[#D93D3D]" />
            </div>
            <h1 className="text-3xl font-bold text-gradient mb-2">{t('early_page_title')}</h1>
            <p className="text-gray-600 mb-8">{t('early_page_sub')}</p>

            {status === 'done' ? (
              <div className="rounded-xl bg-green-50 border border-green-100 p-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <p className="font-semibold text-green-800 mb-1">{t('early_done_title')}</p>
                <p className="text-sm text-green-700 mb-4">{t('early_done_sub')}</p>
                <Link href="/" className="text-[#D93D3D] font-semibold text-sm">
                  {t('back_home')}
                </Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('name')}</label>
                  <input name="name" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                  <input name="email" type="email" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('city_care')}
                  </label>
                  <select name="city" className="input-field" defaultValue="marrakesh">
                    <option value="marrakesh">Marrakech</option>
                    <option value="casablanca">Casablanca</option>
                    <option value="both">{t('both_cities')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('want_most')}
                  </label>
                  <textarea name="message" rows={3} className="input-field" />
                </div>
                {status === 'error' && <p className="text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {status === 'loading' ? t('submitting') : t('join_early')}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
