import { Pinecone } from '@pinecone-database/pinecone';

export const EMBEDDING_DIMENSION = 384;
export const EMBEDDING_MODEL = 'sentence-transformers/all-MiniLM-L6-v2';

const DEFAULT_CLOUD = 'aws';
const DEFAULT_REGION = 'us-east-1';

export interface PineconeConfig {
  apiKey: string;
  indexName: string;
  cloud: string;
  region: string;
}

export function getPineconeConfig(
  env: Record<string, string | undefined> = import.meta.env,
): PineconeConfig {
  const apiKey = env.PINECONE_API_KEY?.trim();
  const indexName = env.PINECONE_INDEX_NAME?.trim();

  if (!apiKey || !indexName) {
    throw new Error(
      'Pinecone is not configured. Set PINECONE_API_KEY and PINECONE_INDEX_NAME.',
    );
  }

  return {
    apiKey,
    indexName,
    cloud: env.PINECONE_CLOUD?.trim() || DEFAULT_CLOUD,
    region: env.PINECONE_REGION?.trim() || DEFAULT_REGION,
  };
}

let client: Pinecone | undefined;

export function getPineconeClient(
  env: Record<string, string | undefined> = import.meta.env,
): Pinecone {
  if (!client) {
    client = new Pinecone({ apiKey: getPineconeConfig(env).apiKey });
  }

  return client;
}

export async function ensurePineconeIndex(
  env: Record<string, string | undefined> = import.meta.env,
): Promise<{ created: boolean; indexName: string }> {
  const config = getPineconeConfig(env);
  const pinecone = getPineconeClient(env);
  const indexes = await pinecone.listIndexes();
  const exists = indexes.indexes?.some((index) => index.name === config.indexName) ?? false;

  if (!exists) {
    await pinecone.createIndex({
      name: config.indexName,
      dimension: EMBEDDING_DIMENSION,
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: config.cloud,
          region: config.region,
        },
      },
    });
  }

  return { created: !exists, indexName: config.indexName };
}

export async function checkPineconeConnection(
  env: Record<string, string | undefined> = import.meta.env,
): Promise<{ connected: true; indexName: string; dimension: number }> {
  const config = getPineconeConfig(env);
  const pinecone = getPineconeClient(env);
  const description = await pinecone.describeIndex(config.indexName);

  if (description.dimension !== EMBEDDING_DIMENSION) {
    throw new Error(
      `Pinecone index "${config.indexName}" has dimension ${description.dimension}, but the configured Hugging Face model ${EMBEDDING_MODEL} produces ${EMBEDDING_DIMENSION}-dimensional vectors. Create a new ${EMBEDDING_DIMENSION}-dimensional index or migrate/re-embed the existing vectors before using it.`,
    );
  }

  return {
    connected: true,
    indexName: config.indexName,
    dimension: description.dimension,
  };
}
