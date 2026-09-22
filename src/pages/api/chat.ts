import type { APIRoute } from 'astro';
import { chat, type ChatMessage } from '../../lib/rag';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as { query?: unknown; history?: unknown };
    const query = typeof body.query === 'string' ? body.query : '';
    const history = Array.isArray(body.history)
      ? body.history.filter((message): message is ChatMessage => {
          if (!message || typeof message !== 'object') return false;
          const candidate = message as Record<string, unknown>;
          return (candidate.role === 'user' || candidate.role === 'assistant') && typeof candidate.content === 'string';
        })
      : [];
    const result = await chat(query, { history });
    return new Response(JSON.stringify(result), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Chat request failed.';
    const status = message.includes('GROQ_API_KEY') ? 500 : 400;
    return new Response(JSON.stringify({ error: message }), { status, headers: { 'content-type': 'application/json' } });
  }
};
