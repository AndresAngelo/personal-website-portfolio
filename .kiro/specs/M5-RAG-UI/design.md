---
name: m5-rag-ui-design
description: Design for M5: RAG Chatbot UI
---

# Design --- M5: RAG Chatbot UI

## Overview

This milestone implements the frontend UI for the RAG chatbot, including the chat widget, streaming responses, citations, and conversational interface.

## Architecture

### Components

**Core Components:**
- `ChatWidget.astro` - Main chat widget wrapper
- `ChatMessages.astro` - Message display component
- `ChatInput.astro` - User input component
- `ChatHeader.astro` - Widget header with toggle

**UI Elements:**
- CitationDisplay.astro - Display citations with sources
- StreamingIndicator.astro - Loading animation

### Data Flow

```
User Opens Widget
    ↓
ChatWidget.astro Renders
    ↓
Load Conversation History
    ↓
User Types Query
    ↓
ChatInput sends to API
    ↓
Streaming Response from /api/chat
    ↓
Display Messages with Citations
    ↓
Add to Conversation History

User Clicks Citation
    ↓
Open Source Modal
    ↓
Show Source Preview
```

### Key Files

```
src/components/
├── ChatWidget.astro      # Main widget wrapper
├── ChatMessages.astro    # Message display
├── ChatInput.astro       # User input
├── ChatHeader.astro      # Widget header
├── CitationDisplay.astro # Citation UI
└── StreamingIndicator.astro

src/lib/
└── chatClient.ts         # API client for chat

src/pages/
└── index.astro           # Include ChatWidget
```

## Implementation Considerations

- Use Vercel AI SDK for streaming
- Implement chat history in local state
- Use CSS transitions for smooth UI changes
- Add keyboard accessibility
- Handle errors gracefully with user-friendly messages

## Dependencies

- Astro 7.x
- Vercel AI SDK
- TypeScript
- M4 RAG Backend API

## References

- [M5 Requirements](./requirements.md)
- [M4 Backend](../M4-RAG-Backend/)
- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)