import type { APIRoute } from 'astro';
import { ingestDocument, type IngestionDocument, type IngestionFormat } from '../../lib/ingestion';

const formats = new Set<IngestionFormat>(['markdown', 'html', 'text']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function parseDocument(value: unknown): IngestionDocument {
  if (!isRecord(value) || typeof value.content !== 'string') {
    throw new Error('Request body must include a string content field.');
  }

  const format = value.format === undefined ? undefined : value.format;
  if (format !== undefined && (typeof format !== 'string' || !formats.has(format as IngestionFormat))) {
    throw new Error('format must be one of: markdown, html, text.');
  }

  const metadata = value.metadata;
  if (metadata !== undefined && !isRecord(metadata)) {
    throw new Error('metadata must be an object.');
  }

  return {
    id: typeof value.id === 'string' ? value.id : undefined,
    title: typeof value.title === 'string' ? value.title : undefined,
    content: value.content,
    format: format as IngestionFormat | undefined,
    source: typeof value.source === 'string' ? value.source : undefined,
    metadata: metadata as IngestionDocument['metadata'],
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Content-Type must be application/json.' }), {
        status: 415,
        headers: { 'content-type': 'application/json' },
      });
    }

    let document: IngestionDocument;
    try {
      document = parseDocument(await request.json());
    } catch (error) {
      const message = error instanceof SyntaxError
        ? 'Request body must be valid JSON.'
        : error instanceof Error ? error.message : 'Invalid ingestion request.';
      return new Response(JSON.stringify({ error: message }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    const record = await ingestDocument(document);
    return new Response(JSON.stringify({ ingestionId: record.id, ...record }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Document ingestion failed.';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};
