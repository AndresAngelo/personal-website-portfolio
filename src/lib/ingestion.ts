import { createHash } from 'node:crypto';

import { chunkText, embedChunks, type EmbeddedChunk, type EmbeddingInput } from './embeddings';
import { upsertVectors, type VectorInput } from './vectorStore';

export const INGESTION_CHUNK_SIZE = 2_000;
export const INGESTION_CHUNK_OVERLAP = 200;

export type IngestionFormat = 'markdown' | 'html' | 'text';
export type IngestionStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface IngestionDocument {
  id?: string;
  title?: string;
  content: string;
  format?: IngestionFormat;
  source?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface IngestionRecord {
  id: string;
  status: IngestionStatus;
  chunkCount: number;
  upsertedCount: number;
  error?: string;
}

export interface IngestionDependencies {
  embed?: (chunks: EmbeddingInput[]) => Promise<EmbeddedChunk[]>;
  upsert?: (vectors: VectorInput[]) => Promise<{ upsertedCount: number }>;
}

const statuses = new Map<string, IngestionRecord>();

function normalizeContent(content: string, format: IngestionFormat = 'text'): string {
  if (format !== 'html') return content.trim();
  return content
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function makeId(document: IngestionDocument, content: string): string {
  if (document.id?.trim()) return document.id.trim();
  return createHash('sha256').update(`${document.title ?? ''}\n${content}`).digest('hex').slice(0, 24);
}

/** Return the latest in-memory status for an ingestion job. */
export function getIngestionStatus(id: string): IngestionRecord | undefined {
  const record = statuses.get(id);
  return record ? { ...record } : undefined;
}

/** Ingest one document: normalize, chunk, embed, and upsert its chunks. */
export async function ingestDocument(
  document: IngestionDocument,
  options: { dependencies?: IngestionDependencies; env?: Record<string, string | undefined>; namespace?: string } = {},
): Promise<IngestionRecord> {
  const content = normalizeContent(document.content, document.format);
  if (!content) throw new Error('Document content must not be empty.');

  const id = makeId(document, content);
  const initial: IngestionRecord = { id, status: 'queued', chunkCount: 0, upsertedCount: 0 };
  statuses.set(id, initial);
  statuses.set(id, { ...initial, status: 'processing' });

  try {
    const chunks = chunkText(content, {
      maxCharacters: INGESTION_CHUNK_SIZE,
      overlapCharacters: INGESTION_CHUNK_OVERLAP,
    });
    const inputs: EmbeddingInput[] = chunks.map((chunk, index) => ({
      id: `${id}:${index}`,
      content: chunk,
      metadata: {
        ...document.metadata,
        documentId: id,
        title: document.title ?? id,
        source: document.source ?? id,
        format: document.format ?? 'text',
        chunkIndex: index,
        chunkCount: chunks.length,
      },
    }));
    const embedded = await (options.dependencies?.embed ?? ((value) => embedChunks(value)))(inputs);
    const vectors: VectorInput[] = embedded.map(({ id: chunkId, embedding, metadata }) => ({
      id: chunkId,
      values: embedding,
      metadata,
    }));
    const result = await (options.dependencies?.upsert ?? ((value) => upsertVectors(value, {
      env: options.env,
      namespace: options.namespace,
    })))(vectors);
    const completed: IngestionRecord = { id, status: 'completed', chunkCount: chunks.length, upsertedCount: result.upsertedCount };
    statuses.set(id, completed);
    return { ...completed };
  } catch (error) {
    const failed: IngestionRecord = {
      id,
      status: 'failed',
      chunkCount: statuses.get(id)?.chunkCount ?? 0,
      upsertedCount: 0,
      error: error instanceof Error ? error.message : String(error),
    };
    statuses.set(id, failed);
    throw error;
  }
}
