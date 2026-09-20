'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
  whatsapp?: string;
  badge?: 'partner' | 'verified';
};

interface BookButtonProps {
  place: BookablePlace;
  compact?: boolean;
  className?: string;
}

export default function BookButton({
  place,
  compact = false,
  className = '',
}: BookButtonProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (place.badge !== 'partner' && place.badge !== 'verified') {
    return null;
  }

  const targetPhone = (place.whatsapp || bookingWhatsAppNumber()).replace(
    /\D/g,
    ''
  );

  const close = () => {
    if (status === 'loading') return;
    setOpen(false);
    setError('');
  };

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

      setOpen(false);
      setStatus('idle');
      setName('');
      setPhone('');
      setDate('');
      setNote('');

      if (targetPhone) {
        // Navigate same-tab friendly on mobile; new tab on desktop
        window.location.href = whatsappUrl(targetPhone, text);
      }
    } catch {
      setError('Network error. Try again.');
      setStatus('error');
    }
  };

  const modal =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4"
            role="dialog"
            aria-modal="true"
            onClick={close}
          >
            <div
              className="w-full sm:max-w-md bg-[#FFFAF5] rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#25D366] mb-1">
                    WhatsApp booking
                  </p>
                  <h3 className="text-lg font-bold text-[#2C3E50] leading-snug break-words">
                    {place.placeName}
                  </h3>
                  {place.city && (
                    <p className="text-sm text-[#2C3E50]/60">{place.city}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="p-1 text-[#2C3E50]/40 hover:text-[#2C3E50] shrink-0"
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
                    className="input-field mt-1"
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
                    className="input-field mt-1"
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
                    className="input-field mt-1"
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
                    className="input-field mt-1"
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
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className={
          className ||
          (compact
            ? 'inline-flex items-center gap-1 text-xs font-bold text-[#25D366] hover:underline shrink-0'
            : 'inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-2.5 py-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#1ebe57] transition-colors shrink-0')
        }
      >
        <MessageCircle className={compact ? 'w-3.5 h-3.5' : 'w-3.5 h-3.5'} />
        WhatsApp
      </button>
      {modal}
    </>
  );
}
