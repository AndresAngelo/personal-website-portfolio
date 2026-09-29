# API Reference

The API routes are implemented under `src/pages/api/` and return JSON responses. Provider-backed operations require server-side environment variables; never expose provider keys in browser code.

## `POST /api/chat`

Sends a question to the portfolio assistant.

### Request

Headers:

```http
Content-Type: application/json
```

Body:

```json
{
  "query": "What projects are in this portfolio?",
  "history": [
    { "role": "user", "content": "Tell me about the work." },
    { "role": "assistant", "content": "The portfolio includes several projects." }
  ]
}
```

`query` must be a non-empty string. `history` is optional; only messages with `user` or `assistant` roles and string `content` are retained.

### Successful response

```json
{
  "answer": "...",
  "sources": []
}
```

The exact answer and source fields are produced by the RAG service. The current route returns status `200` with `Content-Type: application/json` when the request succeeds.

### Error responses

- `400` — malformed JSON or an empty/invalid query.
- `500` — the chat provider is unavailable or `GROQ_API_KEY` is not configured.

Example:

```json
{ "error": "Chat query must not be empty." }
```

## `POST /api/ingest`

Adds a document to the ingestion pipeline.

### Request

Headers:

```http
Content-Type: application/json
```

Body:

```json
{
  "id": "optional-document-id",
  "title": "Portfolio notes",
  "content": "Document text",
  "format": "markdown",
  "source": "docs/notes.md",
  "metadata": { "section": "about" }
}
```

`content` is required. `format` may be `markdown`, `html`, or `text`; when omitted, the service chooses its default. `metadata`, when supplied, must be an object.

### Responses

- `200` — ingestion accepted, returning `ingestionId` and the ingestion record.
- `400` — invalid JSON, missing content, unsupported format, or invalid metadata.
- `415` — request is not JSON.
- `500` — ingestion service or provider failure.

## `GET /api/status`

Reports the health of the vector database integration.

### Healthy response

Returns `200` with `status: "ok"` and connection details under `services.vectorDatabase`.

### Degraded response

Returns `503` when the health check cannot connect:

```json
{
  "status": "degraded",
  "version": "1.0.0",
  "services": {
    "vectorDatabase": {
      "status": "unavailable",
      "connected": false
    }
  },
  "error": "..."
}
```

## Local API verification

Run the focused deterministic API contract tests from the project root:

```powershell
npm.cmd run test:api
```

The tests cover chat, ingestion, status, validation errors, provider-unavailable behavior, response status codes, content types, and JSON body formats. In a PowerShell environment where script execution is restricted, invoke `npm.cmd` explicitly rather than `npm`.
