---
name: m4-rag-backend-design
description: Design for M4: RAG Chatbot Backend
---

# Design --- M4: RAG Chatbot Backend

## Overview

This milestone implements the backend infrastructure for the RAG chatbot, including vector database integration, embedding generation, and API endpoints.

## Architecture

### Components

**Core Services:**
- `rag.ts` - Main RAG orchestration
- `embeddings.ts` - OpenAI embedding generation
- `vectorStore.ts` - Vector database operations
- `ingestion.ts` - Document ingestion pipeline

**API Endpoints:**
- `/api/chat` - Chat query endpoint
- `/api/ingest` - Document ingestion endpoint
- `/api/status` - System status endpoint

### Data Flow

```
Document Upload
    ↓
Ingestion Service
    ↓
Chunking (text splitter)
    ↓
Embedding Generation (OpenAI)
    ↓
Vector Storage (Pinecone)
    ↓

User Query
    ↓
Embed Query (OpenAI)
    ↓
Vector Search (Pinecone)
    ↓
Retrieve Top-K Chunks
    ↓
Format Prompt with Context
    ↓
LLM Response Generation
    ↓
Return Response to Client
```

### Key Files

```
src/lib/
├── rag.ts          # Main RAG orchestration
├── embeddings.ts   # OpenAI integration
├── vectorStore.ts  # Pinecone integration
└── ingestion.ts    # Document ingestion

src/pages/api/
├── chat.ts         # Chat endpoint
├── ingest.ts       # Ingestion endpoint
└── status.ts       # Status endpoint
```

## Implementation Considerations

- Use OpenAI's text-embedding-3-small or similar
- Implement chunking with overlap for context continuity
- Use Pinecone for vector storage (or similar)
- Implement retry logic for API failures
- Add proper error handling and logging

## Dependencies

- OpenAI API
- Pinecone (or similar vector database)
- TypeScript
- Astro server-side APIs

## References

- [M4 Requirements](./requirements.md)
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)