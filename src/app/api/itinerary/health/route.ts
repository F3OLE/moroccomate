import { NextResponse } from 'next/server';
import { geminiKeyPresent, geminiKeySource } from '@/lib/gemini';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Safe diagnostics — never returns the key value.
 * GET /api/itinerary/health
 */
export async function GET() {
  const present = geminiKeyPresent();
  const source = geminiKeySource();

  return NextResponse.json({
    ok: true,
    geminiKeyPresent: present,
    geminiKeyEnv: source,
    hint: present
      ? 'Key is loaded on this server. If plans still say curated, Gemini may be erroring — check function logs.'
      : 'No Gemini key on this server. On Vercel: Project → Settings → Environment Variables → add GEMINI_API_KEY for Production (and Preview), then Redeploy.',
  });
}
