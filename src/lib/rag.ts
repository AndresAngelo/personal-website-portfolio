import Groq from 'groq-sdk';
import { generateEmbeddings } from './embeddings';
import { searchVectors, type VectorMatch } from './vectorStore';

export const CHAT_MODEL = 'openai/gpt-oss-20b';
export const DEFAULT_TOP_K = 5;
export const DEFAULT_MAX_CONTEXT_CHARACTERS = 12_000;
export const NO_CONTEXT_FALLBACK = "I couldn't find enough information in the portfolio knowledge base to answer that confidently.";

export interface DocumentChunk { id: string; source: string; content: string; score?: number }
export interface ChatMessage { role: 'user' | 'assistant'; content: string }
export interface ChatResult { answer: string; sources: DocumentChunk[] }
type ChatClient = Pick<Groq, 'chat'>;
export interface ChatOptions {
  history?: ChatMessage[]; topK?: number; maxContextCharacters?: number;
  env?: Record<string, string | undefined>;
  embed?: (text: string) => Promise<number[]>;
  search?: (embedding: number[], topK: number) => Promise<VectorMatch[]>;
  client?: ChatClient;
}

function getGroqClient(env: Record<string, string | undefined> = import.meta.env): Groq {
  const apiKey = env.GROQ_API_KEY?.trim() || (typeof process !== 'undefined' ? process.env.GROQ_API_KEY?.trim() : undefined);
  if (!apiKey) throw new Error('Groq is not configured. Set GROQ_API_KEY in Vercel environment variables.');
  // Groq is free-tier friendly because the project has no OpenAI key; use the smallest preferred model.
  return new Groq({ apiKey, timeout: 30_000 });
}

function metadataText(metadata: VectorMatch['metadata'], key: string): string | undefined {
  const value = metadata?.[key];
  return typeof value === 'string' ? value : undefined;
}

/** Retrieve ranked chunks and preserve their source metadata for citations. */
export async function retrieveChunks(query: string, options: Pick<ChatOptions, 'topK' | 'embed' | 'search'> = {}): Promise<DocumentChunk[]> {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) throw new Error('Chat query must not be empty.');
  const topK = options.topK ?? DEFAULT_TOP_K;
  const embed = options.embed ?? (async (text: string) => (await generateEmbeddings([text]))[0]);
  const search = options.search ?? ((embedding: number[], count: number) => searchVectors(embedding, { topK: count }));
  const matches = await search(await embed(normalizedQuery), topK);
  return matches.map((match) => ({ id: match.id, source: metadataText(match.metadata, 'source') ?? 'Unknown source', content: metadataText(match.metadata, 'content') ?? '', score: match.score })).filter((chunk) => chunk.content.trim().length > 0);
}

function formatContext(chunks: DocumentChunk[], maxCharacters: number): string {
  let used = 0;
  return chunks.map((chunk, index) => {
    const entry = `[${index + 1}] ${chunk.source}\n${chunk.content.trim()}`;
    if (used + entry.length > maxCharacters) return '';
    used += entry.length;
    return entry;
  }).filter(Boolean).join('\n\n');
}

/** Run retrieval, context formatting, and grounded LLM response generation. */
export async function chat(query: string, options: ChatOptions = {}): Promise<ChatResult> {
  const chunks = await retrieveChunks(query, options);
  if (chunks.length === 0) return { answer: NO_CONTEXT_FALLBACK, sources: [] };
  const context = formatContext(chunks, options.maxContextCharacters ?? DEFAULT_MAX_CONTEXT_CHARACTERS);
  const response = await (options.client ?? getGroqClient(options.env)).chat.completions.create({
    model: options.env?.GROQ_CHAT_MODEL?.trim() || CHAT_MODEL, temperature: 0.2, max_completion_tokens: 512,
    messages: [
      { role: 'system', content: `You are a helpful portfolio assistant. Answer using only the provided context. If the context does not answer the question, say so clearly. Cite supporting sources as [1], [2], etc.\n\nContext:\n${context}` },
      ...(options.history ?? []).map((message) => ({ role: message.role, content: message.content })),
      { role: 'user' as const, content: query.trim() },
    ],
  });
  const answer = response.choices[0]?.message?.content?.trim();
  if (!answer) throw new Error('Chat model returned an empty response.');
  return { answer, sources: chunks };
}
