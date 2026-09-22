import type { Index, PineconeRecord, RecordMetadata } from '@pinecone-database/pinecone';

import { EMBEDDING_DIMENSION } from './pinecone';
import { getPineconeClient, getPineconeConfig } from './pinecone';

export const VECTOR_BATCH_SIZE = 100;
export const DEFAULT_NAMESPACE = 'portfolio';

export type VectorMetadata = RecordMetadata;

export interface VectorInput {
  id: string;
  values: number[];
  metadata?: VectorMetadata;
}

export interface VectorMatch {
  id: string;
  score: number;
  metadata?: VectorMetadata;
}

export interface VectorSearchOptions {
  topK?: number;
  namespace?: string;
  filter?: Record<string, unknown>;
}

type VectorIndex = Pick<Index<VectorMetadata>, 'upsert' | 'query'>;

function getIndex(
  env: Record<string, string | undefined> = import.meta.env,
  namespace = DEFAULT_NAMESPACE,
): VectorIndex {
  const config = getPineconeConfig(env);
  return getPineconeClient(env).index<VectorMetadata>({ name: config.indexName, namespace });
}

function validateVector(vector: VectorInput): PineconeRecord<VectorMetadata> {
  if (!vector.id.trim()) throw new Error('Vector IDs must not be empty.');
  if (vector.values.length !== EMBEDDING_DIMENSION) {
    throw new Error(`Vector "${vector.id}" has dimension ${vector.values.length}; expected ${EMBEDDING_DIMENSION}.`);
  }
  if (vector.values.some((value) => !Number.isFinite(value))) {
    throw new Error(`Vector "${vector.id}" contains a non-finite value.`);
  }
  return { id: vector.id, values: vector.values, metadata: vector.metadata };
}

/** Upsert vectors in bounded batches, preserving IDs and searchable metadata. */
export async function upsertVectors(
  vectors: VectorInput[],
  options: { env?: Record<string, string | undefined>; namespace?: string; index?: VectorIndex } = {},
): Promise<{ upsertedCount: number }> {
  const index = options.index ?? getIndex(options.env, options.namespace);
  const records = vectors.map(validateVector);
  for (let start = 0; start < records.length; start += VECTOR_BATCH_SIZE) {
    await index.upsert({ records: records.slice(start, start + VECTOR_BATCH_SIZE) });
  }
  return { upsertedCount: records.length };
}

/** Query the configured namespace and return Pinecone matches ordered by score. */
export async function searchVectors(
  query: number[],
  options: VectorSearchOptions & { env?: Record<string, string | undefined>; index?: VectorIndex } = {},
): Promise<VectorMatch[]> {
  if (query.length !== EMBEDDING_DIMENSION) {
    throw new Error(`Query vector has dimension ${query.length}; expected ${EMBEDDING_DIMENSION}.`);
  }
  if (query.some((value) => !Number.isFinite(value))) throw new Error('Query vector contains a non-finite value.');
  const topK = options.topK ?? 5;
  if (!Number.isInteger(topK) || topK <= 0) throw new Error('topK must be a positive integer.');

  const index = options.index ?? getIndex(options.env, options.namespace);
  const response = await index.query({
    vector: query,
    topK,
    filter: options.filter,
    includeMetadata: true,
  });
  return (response.matches ?? [])
    .map((match) => ({ id: match.id, score: match.score ?? 0, metadata: match.metadata }))
    .sort((a, b) => b.score - a.score);
}
