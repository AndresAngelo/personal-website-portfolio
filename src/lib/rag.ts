export interface DocumentChunk {
  id: string;
  source: string;
  content: string;
}

export async function retrieveChunks(query: string): Promise<DocumentChunk[]> {
  return [];
}
