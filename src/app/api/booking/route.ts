import { NextResponse } from 'next/server';
import { getSupabaseServer, isSupabaseConfigured } from '@/lib/supabase';

type BookingBody = {
  placeId?: string;
  placeName?: string;
  city?: string;
  travelerName?: string;
  travelerPhone?: string;
  travelerEmail?: string;
  preferredDate?: string;
  message?: string;
  channel?: string;
};

const memoryBookings: BookingBody[] = [];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingBody;

    if (!body.placeName?.trim()) {
      return NextResponse.json(
        { error: 'Place name is required' },
        { status: 400 }
      );
    }

    if (!body.travelerPhone?.trim() && !body.travelerEmail?.trim()) {
      return NextResponse.json(
        { error: 'Phone or email required so we can reach you' },
        { status: 400 }
      );
    }

    const row = {
      place_id: body.placeId || null,
      place_name: body.placeName.trim(),
      city: body.city || null,
      traveler_name: body.travelerName?.trim() || null,
      traveler_phone: body.travelerPhone?.trim() || null,
      traveler_email: body.travelerEmail?.trim().toLowerCase() || null,
      preferred_date: body.preferredDate || null,
      message: body.message?.trim() || null,
      channel: body.channel || 'whatsapp',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseServer();
      const { error } = await supabase.from('booking_leads').insert(row);

      if (error) {
        console.error('Supabase booking_leads insert error:', error);
        return NextResponse.json(
          { error: 'Could not save your request. Try again.' },
          { status: 500 }
        );
      }
    } else {
      memoryBookings.push({ ...body, ...row });
      if (memoryBookings.length > 200) memoryBookings.shift();
      console.warn(
        '[booking] Supabase not configured. Stored in memory only.'
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Request saved. Opening WhatsApp…',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      count: memoryBookings.length,
      backend: 'memory',
    });
  }

  const supabase = getSupabaseServer();
  const { count, error } = await supabase
    .from('booking_leads')
    .select('*', { count: 'exact', head: true });

  if (error) {
    return NextResponse.json({
      backend: 'supabase',
      error: error.message,
    });
  }

  return NextResponse.json({ count: count ?? 0, backend: 'supabase' });
}
