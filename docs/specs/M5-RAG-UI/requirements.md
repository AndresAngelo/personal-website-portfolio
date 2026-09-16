---
name: m5-rag-ui-requirements
description: Requirements for M5: RAG Chatbot UI
---

# Requirements --- M5: RAG Chatbot UI

## Introduction

This milestone implements the frontend UI for the RAG chatbot, including the chat widget, streaming responses, citations, and conversational interface.

**Scope:**
- Chat widget component for website integration
- Streaming responses from LLM
- Citation display with source links
- Conversation history management
- User input handling and validation

**Out of Scope:**
- Backend API implementation (M4)
- PWA features (M6)
- Performance optimization (M7)
- Security hardening (M8)
- Advanced chat features (typing indicators, etc.)

## Glossary

| Term | Definition |
|------|------------|
| Streaming | Real-time response delivery as tokens generated |
| Citation | Reference to source document supporting response |
| Conversation History | Previous messages in chat session |

## Requirements

### Requirement 5.1: Chat Widget

**User Story:** As a visitor, I want a chat widget, so that I can ask questions about the portfolio.

#### Acceptance Criteria

1. Chat widget accessible from any page
2. Opens/closes with toggle button
3. Widget positioned on right side
4. Shows unread message indicator
5. Responsive on mobile devices

### Requirement 5.2: Streaming Responses

**User Story:** As a user, I want to see responses as they're generated, so that I know the chatbot is working.

#### Acceptance Criteria

1. Response text streams in real-time
2. Streaming indicator shows during generation
3. Text appears character-by-character or word-by-word
4. Cancel button available during streaming
5. Streaming stops when complete

### Requirement 5.3: Citations

**User Story:** As a user, I want to see sources, so that I can verify the information.

#### Acceptance Criteria

1. Citations appear with each response
2. Citations link to source documents
3. Each citation numbered in response text
4. Citation list at end of response
5. Source preview available on click

### Requirement 5.4: Conversation History

**User Story:** As a user, I want to see my conversation history, so that I can reference past questions.

#### Acceptance Criteria

1. Previous messages display in conversation
2. User messages styled differently from bot
3. Clear timestamp on each message
4. History persists during session
5. Clear chat button available

### Requirement 5.5: User Input

**User Story:** As a user, I want to type questions, so that I can interact with the chatbot.

#### Acceptance Criteria

1. Input field for user queries
2. Send button or Enter key submits
3. Loading state during processing
4. Error messages for invalid input
5. Maximum input length enforced

### Requirement 5.6: Responsive Design

**User Story:** As a mobile user, I want the chat widget to work on my device, so that I can access it anywhere.

#### Acceptance Criteria

1. Chat widget adapts to mobile screens
2. Touch-friendly input and buttons
3. Messages scroll correctly
4. Widget doesn't block content
5. Performance acceptable on mobile

## Constraints

- Must use Astro 7.x components
- Must integrate with M4 API endpoints
- Must support streaming via Vercel AI SDK
- Must work within existing layout
- Must be accessible (WCAG 2.1 AA)

## References

- [M4 RAG Backend](../M4-RAG-Backend/)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Astro Components](https://docs.astro.build/en/core-concepts/astro-components/)