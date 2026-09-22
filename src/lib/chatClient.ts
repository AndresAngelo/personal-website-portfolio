export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatCitation {
  id: string;
  source: string;
  content: string;
  score?: number;
}

export interface ChatResponse {
  answer: string;
  sources: ChatCitation[];
}

export interface SendMessageOptions {
  history?: ChatMessage[];
  signal?: AbortSignal;
  endpoint?: string;
  onChunk?: (chunk: string) => void;
}

type ChatPayload = Partial<ChatResponse> & { content?: string; error?: string };

function parsePayload(value: unknown): ChatPayload {
  if (!value || typeof value !== 'object') return {};
  return value as ChatPayload;
}

function extractText(payload: ChatPayload): string {
  return typeof payload.answer === 'string' ? payload.answer : typeof payload.content === 'string' ? payload.content : '';
}

function parseStreamLine(line: string): string {
  const value = line.startsWith('data:') ? line.slice(5).trim() : line.trim();
  if (!value || value === '[DONE]') return '';
  try {
    return extractText(parsePayload(JSON.parse(value))) || value;
  } catch {
    return value;
  }
}

export async function sendMessage(query: string, options: SendMessageOptions = {}): Promise<ChatResponse> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) throw new Error('Please enter a question.');

  const response = await fetch(options.endpoint ?? '/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'text/event-stream, application/json, text/plain' },
    body: JSON.stringify({ query: trimmedQuery, history: options.history ?? [] }),
    signal: options.signal,
  });

  if (!response.ok) {
    let message = `The assistant could not answer right now (${response.status}).`;
    try {
      const payload = parsePayload(await response.json());
      if (payload.error) message = payload.error;
    } catch { /* Keep the actionable generic message for non-JSON errors. */ }
    throw new Error(message);
  }

  if (!response.body) {
    const payload = parsePayload(await response.json());
    const answer = extractText(payload);
    if (!answer) throw new Error('The assistant returned an empty response.');
    options.onChunk?.(answer);
    return { answer, sources: Array.isArray(payload.sources) ? payload.sources : [] };
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let answer = '';
  let sources: ChatCitation[] = [];
  const consume = (line: string) => {
    const value = parseStreamLine(line);
    if (!value) return;
    try {
      const payload = parsePayload(JSON.parse(line.startsWith('data:') ? line.slice(5).trim() : line.trim()));
      const text = extractText(payload);
      if (Array.isArray(payload.sources)) sources = payload.sources;
      if (text) answer = text;
      else answer += value;
    } catch { answer += value; }
    options.onChunk?.(value);
  };

  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() ?? '';
    lines.forEach(consume);
    if (done) break;
  }
  if (buffer) consume(buffer);
  if (!answer) throw new Error('The assistant returned an empty response.');
  return { answer, sources };
}
