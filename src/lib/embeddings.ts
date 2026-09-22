import { InferenceClient, type FeatureExtractionOutput } from '@huggingface/inference';

import { EMBEDDING_DIMENSION, EMBEDDING_MODEL } from './pinecone';

export { EMBEDDING_DIMENSION, EMBEDDING_MODEL };
export const EMBEDDING_BATCH_SIZE = 100;
export const DEFAULT_CHUNK_SIZE = 12_000;
export const DEFAULT_CHUNK_OVERLAP = 500;

export interface EmbeddingInput {
  id: string;
  content: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface EmbeddedChunk extends EmbeddingInput {
  embedding: number[];
}

export interface ChunkOptions {
  maxCharacters?: number;
  overlapCharacters?: number;
}

type EmbeddingsClient = Pick<InferenceClient, 'featureExtraction'>;

function getHuggingFaceClient(env: Record<string, string | undefined> = import.meta.env): InferenceClient {
  const apiKey = env.HF_TOKEN?.trim();
  if (!apiKey) {
    throw new Error('Hugging Face embeddings are not configured. Set the server-only HF_TOKEN.');
  }
  return new InferenceClient(apiKey);
}

/** Split long content into overlapping character windows without dropping text. */
export function chunkText(text: string, options: ChunkOptions = {}): string[] {
  const maxCharacters = options.maxCharacters ?? DEFAULT_CHUNK_SIZE;
  const overlapCharacters = options.overlapCharacters ?? DEFAULT_CHUNK_OVERLAP;

  if (!Number.isInteger(maxCharacters) || maxCharacters <= 0) {
    throw new Error('maxCharacters must be a positive integer.');
  }
  if (!Number.isInteger(overlapCharacters) || overlapCharacters < 0 || overlapCharacters >= maxCharacters) {
    throw new Error('overlapCharacters must be a non-negative integer smaller than maxCharacters.');
  }

  const normalized = text.trim();
  if (!normalized) return [];
  if (normalized.length <= maxCharacters) return [normalized];

  const chunks: string[] = [];
  const step = maxCharacters - overlapCharacters;
  for (let start = 0; start < normalized.length; start += step) {
    const chunk = normalized.slice(start, start + maxCharacters).trim();
    if (chunk) chunks.push(chunk);
    if (start + maxCharacters >= normalized.length) break;
  }
  return chunks;
}

async function requestBatch(client: EmbeddingsClient, input: string[]): Promise<number[][]> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await client.featureExtraction({
        model: EMBEDDING_MODEL,
        inputs: input,
      });
      const embeddings = normalizeOutput(response, input.length);
      if (embeddings.some((embedding) => embedding.length !== EMBEDDING_DIMENSION)) {
        throw new Error(`Hugging Face returned an embedding with an unexpected dimension; expected ${EMBEDDING_DIMENSION}.`);
      }
      return embeddings;
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** attempt));
    }
  }
  throw new Error(`Embedding request failed after 3 attempts: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

function normalizeOutput(output: FeatureExtractionOutput, expectedCount: number): number[][] {
  if (!Array.isArray(output)) throw new Error('Hugging Face returned an invalid embedding response.');
  const vectors = output as unknown[];
  if (expectedCount === 1 && vectors.every((value) => typeof value === 'number')) return [vectors as number[]];
  if (vectors.length !== expectedCount || vectors.some((value) => !Array.isArray(value) || value.some((item) => typeof item !== 'number'))) {
    throw new Error('Hugging Face returned an invalid embedding response shape.');
  }
  return vectors as number[][];
}

/** Generate embeddings for text in bounded batches, preserving input order. */
export async function generateEmbeddings(
  texts: string[],
  options: { client?: EmbeddingsClient } = {},
): Promise<number[][]> {
  if (texts.length === 0) return [];
  const client = options.client ?? getHuggingFaceClient();
  const embeddings: number[][] = [];
  for (let start = 0; start < texts.length; start += EMBEDDING_BATCH_SIZE) {
    embeddings.push(...await requestBatch(client, texts.slice(start, start + EMBEDDING_BATCH_SIZE)));
  }
  return embeddings;
}

/** Generate vectors while retaining document IDs and metadata for vector storage. */
export async function embedChunks(
  chunks: EmbeddingInput[],
  options: { client?: EmbeddingsClient } = {},
): Promise<EmbeddedChunk[]> {
  const embeddings = await generateEmbeddings(chunks.map((chunk) => chunk.content), options);
  return chunks.map((chunk, index) => ({ ...chunk, embedding: embeddings[index] }));
}
