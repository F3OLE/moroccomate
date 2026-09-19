import { NextResponse } from 'next/server';
import { getSupabaseServer, isSupabaseConfigured } from '@/lib/supabase';

type LeadBody = {
  type?: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  businessName?: string;
  businessType?: string;
  message?: string;
  createdAt?: string;
};

/** Fallback only when Supabase env vars are missing (local/dev). */
const memoryLeads: LeadBody[] = [];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadBody;

    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const type = body.type === 'partner' ? 'partner' : 'early-access';

    if (type === 'partner' && !body.businessName) {
      return NextResponse.json(
        { error: 'Business name required for partners' },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseServer();
      const { error } = await supabase.from('leads').insert({
        type,
        name: body.name || null,
        email: body.email.trim().toLowerCase(),
        phone: body.phone || null,
        city: body.city || null,
        business_name: body.businessName || null,
        business_type: body.businessType || null,
        message: body.message || null,
        created_at: body.createdAt || new Date().toISOString(),
      });

      if (error) {
        console.error('Supabase leads insert error:', error);
        return NextResponse.json(
          { error: 'Could not save your submission. Try again.' },
          { status: 500 }
        );
      }
    } else {
      memoryLeads.push({ ...body, type, createdAt: new Date().toISOString() });
      if (memoryLeads.length > 200) memoryLeads.shift();
      console.warn(
        '[leads] Supabase not configured — stored in memory only. Set env vars for Vercel.'
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        type === 'partner'
          ? 'Thanks — we will review your business for featuring.'
          : 'You are on the early access list. We will email you soon.',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      count: memoryLeads.length,
      backend: 'memory',
      warning: 'Supabase not configured',
    });
  }

  const supabase = getSupabaseServer();
  const { count, error } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true });

  if (error) {
    return NextResponse.json({
      backend: 'supabase',
      note: 'Inserts work; count needs service_role or a SELECT policy.',
      error: error.message,
    });
  }

  return NextResponse.json({ count: count ?? 0, backend: 'supabase' });
}
