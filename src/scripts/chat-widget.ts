import { sendMessage, type ChatMessage } from '../lib/chatClient';

const HISTORY_KEY = 'portfolio-assistant-history';
const MAX_HISTORY = 50;

export function initChatWidget(widget: HTMLElement): void {
  const toggle = widget.querySelector<HTMLButtonElement>('#chat-toggle');
  const panel = widget.querySelector<HTMLElement>('#chat-panel');
  const close = widget.querySelector<HTMLButtonElement>('[data-chat-close]');
  const clear = widget.querySelector<HTMLButtonElement>('[data-chat-clear]');
  const unread = widget.querySelector<HTMLElement>('.chat-unread');
  const messages = widget.querySelector<HTMLElement>('[data-chat-messages]');
  const indicator = widget.querySelector<HTMLElement>('[data-streaming-indicator]');
  const cancel = widget.querySelector<HTMLButtonElement>('[data-streaming-cancel]');
  const input = widget.querySelector<HTMLTextAreaElement>('[data-chat-question]');
  let controller: AbortController | undefined;

  function storedHistory(): ChatMessage[] {
    try {
      const value = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');
      return Array.isArray(value)
        ? value.filter((item): item is ChatMessage => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string').slice(-MAX_HISTORY)
        : [];
    } catch {
      return [];
    }
  }

  function saveHistory(): void {
    if (!messages) return;
    const history = Array.from(messages.querySelectorAll<HTMLElement>('[data-message-role]'))
      .map((message) => ({ role: message.dataset.messageRole, content: message.querySelector('.chat-message-content')?.textContent ?? '' }))
      .filter((item): item is ChatMessage => (item.role === 'user' || item.role === 'assistant') && Boolean(item.content.trim()))
      .slice(-MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }

  function appendMessage(role: 'user' | 'assistant', content: string): HTMLElement | null {
    const article = document.createElement('article');
    article.className = `chat-message chat-message-${role}`;
    article.dataset.messageRole = role;
    article.innerHTML = `<p class="chat-message-label">${role === 'user' ? 'You' : 'Assistant'}</p><p class="chat-message-content"></p><time class="chat-message-time">${new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date())}</time>`;
    const contentNode = article.querySelector<HTMLElement>('.chat-message-content');
    if (contentNode) contentNode.textContent = content;
    messages?.append(article);
    messages?.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
    return contentNode;
  }

  function loadHistory(): void {
    const history = storedHistory();
    if (!messages || !history.length) return;
    messages.innerHTML = '';
    history.forEach((item) => appendMessage(item.role, item.content));
  }

  async function streamResponse(question: string): Promise<void> {
    if (controller) { controller.abort(); return; }
    controller = new AbortController();
    const history = Array.from(messages?.querySelectorAll<HTMLElement>('[data-message-role]') ?? [])
      .map((message) => ({ role: message.dataset.messageRole, content: message.querySelector('.chat-message-content')?.textContent ?? '' }))
      .filter((item): item is ChatMessage => (item.role === 'user' || item.role === 'assistant') && Boolean(item.content.trim()));
    appendMessage('user', question);
    const assistant = appendMessage('assistant', '');
    if (indicator) indicator.hidden = false;
    let streamedText = '';
    try {
      const result = await sendMessage(question, {
        history,
        signal: controller.signal,
        onChunk: (chunk) => {
          streamedText = chunk === streamedText || streamedText.endsWith(chunk) ? streamedText : streamedText + chunk;
          if (assistant) assistant.textContent = streamedText;
        },
      });
      if (assistant) assistant.textContent = result.answer;
      saveHistory();
    } catch (error) {
      if ((error as Error).name !== 'AbortError' && assistant) assistant.textContent = error instanceof Error ? error.message : 'The assistant could not answer right now.';
    } finally {
      controller = undefined;
      if (indicator) indicator.hidden = true;
      if (input) input.value = '';
    }
  }

  function setOpen(open: boolean): void {
    if (!toggle || !panel) return;
    toggle.setAttribute('aria-expanded', String(open));
    panel.setAttribute('aria-hidden', String(!open));
    panel.hidden = !open;
    if (open) { unread?.setAttribute('hidden', 'true'); close?.focus(); } else toggle.focus();
  }

  toggle?.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  close?.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') setOpen(false); });
  widget.addEventListener('chat:submit', (event) => {
    const content = (event as CustomEvent<{ content?: string }>).detail?.content?.trim();
    if (content) void streamResponse(content);
  });
  cancel?.addEventListener('click', () => controller?.abort());
  clear?.addEventListener('click', () => { localStorage.removeItem(HISTORY_KEY); if (messages) messages.innerHTML = ''; appendMessage('assistant', 'Ask me about projects, experience, or how this portfolio was built.'); });
  loadHistory();
}
