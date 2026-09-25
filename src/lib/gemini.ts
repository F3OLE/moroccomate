/**
 * Resolve Gemini API key from common env names.
 * Never expose the value to the client.
 */
export function getGeminiApiKey(): string | null {
  const candidates = [
    process.env.GEMINI_API_KEY,
    process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    process.env.GOOGLE_AI_API_KEY,
    process.env.GOOGLE_API_KEY,
  ];

  for (const raw of candidates) {
    const key = raw?.trim();
    if (!key) continue;
    if (
      key === 'your_gemini_api_key' ||
      key === 'YOUR_GEMINI_API_KEY' ||
      key.toLowerCase().includes('placeholder')
    ) {
      continue;
    }
    return key;
  }
  return null;
}

export function geminiKeyPresent(): boolean {
  return Boolean(getGeminiApiKey());
}

/** Which env var name held the key (for server logs only). */
export function geminiKeySource(): string | null {
  const map: [string, string | undefined][] = [
    ['GEMINI_API_KEY', process.env.GEMINI_API_KEY],
    ['GOOGLE_GENERATIVE_AI_API_KEY', process.env.GOOGLE_GENERATIVE_AI_API_KEY],
    ['GOOGLE_AI_API_KEY', process.env.GOOGLE_AI_API_KEY],
    ['GOOGLE_API_KEY', process.env.GOOGLE_API_KEY],
  ];
  for (const [name, raw] of map) {
    const key = raw?.trim();
    if (key && key !== 'your_gemini_api_key' && !key.toLowerCase().includes('placeholder')) {
      return name;
    }
  }
  return null;
}
