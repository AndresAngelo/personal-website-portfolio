import type { APIRoute } from 'astro';
import { checkPineconeConnection } from '../../lib/pinecone';

const VERSION = import.meta.env.PUBLIC_APP_VERSION?.trim() || '1.0.0';

function json(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

export const GET: APIRoute = async () => {
  try {
    const database = await checkPineconeConnection();

    return json({
      status: 'ok',
      version: VERSION,
      services: {
        vectorDatabase: {
          status: 'ok',
          connected: database.connected,
          indexName: database.indexName,
          dimension: database.dimension,
        },
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Vector database health check failed.';

    return json({
      status: 'degraded',
      version: VERSION,
      services: {
        vectorDatabase: {
          status: 'unavailable',
          connected: false,
        },
      },
      error: message,
    }, 503);
  }
};
