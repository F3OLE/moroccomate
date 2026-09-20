/** Build a wa.me link. Number: digits only, country code included (e.g. 2126…). */
export function whatsappUrl(phoneDigits: string, text: string) {
  const phone = phoneDigits.replace(/\D/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/** Central MoroccoMate booking inbox (set in Vercel / .env.local). */
export function bookingWhatsAppNumber() {
  return (
    process.env.NEXT_PUBLIC_BOOKING_WHATSAPP?.replace(/\D/g, '') || ''
  );
}

export function buildBookingMessage(opts: {
  placeName: string;
  city?: string;
  travelerName?: string;
  travelerPhone?: string;
  preferredDate?: string;
  message?: string;
}) {
  const lines = [
    `Hi MoroccoMate, I want to book: ${opts.placeName}`,
    opts.city ? `City: ${opts.city}` : null,
    opts.preferredDate ? `Preferred date: ${opts.preferredDate}` : null,
    opts.travelerName ? `Name: ${opts.travelerName}` : null,
    opts.travelerPhone ? `My WhatsApp: ${opts.travelerPhone}` : null,
    opts.message ? `Note: ${opts.message}` : null,
    'Sent from moroccomate.com',
  ].filter(Boolean);
  return lines.join('\n');
}
