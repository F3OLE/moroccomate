'use client';

import { useState } from 'react';
import { MessageCircle, X, Loader2 } from 'lucide-react';
import {
  bookingWhatsAppNumber,
  buildBookingMessage,
  whatsappUrl,
} from '@/lib/booking';

export type BookablePlace = {
  placeId?: string;
  placeName: string;
  city?: string;
  /** Optional venue-specific WhatsApp (digits with country code) */
  whatsapp?: string;
  badge?: 'partner' | 'verified';
};

interface BookButtonProps {
  place: BookablePlace;
  /** Compact style for itinerary rows */
  compact?: boolean;
  className?: string;
}

export default function BookButton({
  place,
  compact = false,
  className = '',
}: BookButtonProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  // Only show on partner / verified spots
  if (place.badge !== 'partner' && place.badge !== 'verified') {
    return null;
  }

  const targetPhone = (place.whatsapp || bookingWhatsAppNumber()).replace(
    /\D/g,
    ''
  );

  const submit = async () => {
    if (!phone.trim()) {
      setError('Add your WhatsApp number so we can confirm.');
      return;
    }
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeId: place.placeId,
          placeName: place.placeName,
          city: place.city,
          travelerName: name,
          travelerPhone: phone,
          preferredDate: date,
          message: note,
          channel: 'whatsapp',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Could not save request');
        setStatus('error');
        return;
      }

      const text = buildBookingMessage({
        placeName: place.placeName,
        city: place.city,
        travelerName: name,
        travelerPhone: phone,
        preferredDate: date,
        message: note,
      });

      if (targetPhone) {
        window.open(whatsappUrl(targetPhone, text), '_blank', 'noopener,noreferrer');
      }

      setOpen(false);
      setStatus('idle');
      setName('');
      setPhone('');
      setDate('');
      setNote('');
    } catch {
      setError('Network error. Try again.');
      setStatus('error');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ||
          (compact
            ? 'inline-flex items-center gap-1 text-xs font-bold text-[#25D366] hover:underline'
            : 'inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#1ebe57] transition-colors')
        }
      >
        <MessageCircle className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
        Book WhatsApp
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-black/55 p-0 sm:p-4"
          onClick={() => status !== 'loading' && setOpen(false)}
        >
          <div
            className="w-full sm:max-w-md bg-[#FFFAF5] rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#25D366] mb-1">
                  WhatsApp booking
                </p>
                <h3 className="text-lg font-bold text-[#2C3E50] leading-snug">
                  {place.placeName}
                </h3>
                {place.city && (
                  <p className="text-sm text-[#2C3E50]/60">{place.city}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 text-[#2C3E50]/40 hover:text-[#2C3E50]"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C3E50]/50">
                  Your name
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#2C3E50]/15 bg-white px-3 py-2.5 text-[#2C3E50]"
                  placeholder="Optional"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C3E50]/50">
                  Your WhatsApp *
                </span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#2C3E50]/15 bg-white px-3 py-2.5 text-[#2C3E50]"
                  placeholder="+212 6…"
                  inputMode="tel"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C3E50]/50">
                  Preferred date
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#2C3E50]/15 bg-white px-3 py-2.5 text-[#2C3E50]"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C3E50]/50">
                  Note
                </span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-xl border border-[#2C3E50]/15 bg-white px-3 py-2.5 text-[#2C3E50]"
                  placeholder="Table for 2, sunset, etc."
                />
              </label>
            </div>

            {error && (
              <p className="mt-3 text-sm text-[#D93D3D] font-medium">{error}</p>
            )}

            <button
              type="button"
              onClick={submit}
              disabled={status === 'loading'}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-3 rounded-xl disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" />
                  {targetPhone ? 'Save & open WhatsApp' : 'Send request'}
                </>
              )}
            </button>
            <p className="mt-2 text-[11px] text-[#2C3E50]/45 text-center">
              {targetPhone
                ? 'We save your lead, then open WhatsApp to confirm.'
                : 'Request saved. Set NEXT_PUBLIC_BOOKING_WHATSAPP to auto-open chat.'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
