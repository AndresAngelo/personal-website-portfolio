import type { APIRoute } from 'astro';

const MAX_REPORT_BYTES = 64 * 1024;

/** Accept browser CSP reports without exposing report contents in application responses. */
export const POST: APIRoute = async ({ request }) => {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_REPORT_BYTES) {
    return new Response(null, { status: 413 });
  }

  // Consume the body so the serverless runtime can reuse the request cleanly.
  await request.arrayBuffer();
  return new Response(null, { status: 204 });
};

export const ALL: APIRoute = () => new Response(null, {
  status: 405,
  headers: { allow: 'POST' },
});
