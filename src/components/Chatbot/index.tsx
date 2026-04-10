import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css';

// ── Config ──────────────────────────────────────────────────────────────────
// Set this to your n8n webhook URL, e.g. via docusaurus customFields:
// siteConfig.customFields.n8nWebhookUrl
const N8N_WEBHOOK_URL =
  (typeof window !== 'undefined' && (window as any).__N8N_WEBHOOK_URL__) ||
  'https://n8n.monadical.io/webhook-test/docs-chat';

// ── Types ────────────────────────────────────────────────────────────────────
type Role = 'user' | 'bot';
interface Message {
  role: Role;
  content: string;
  error?: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function generateSessionId() {
  return 'session-' + Math.random().toString(36).slice(2, 10) + '-' + Date.now();
}

// ── Icons ────────────────────────────────────────────────────────────────────
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    <path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>
  </svg>
);
const ExpandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 3 6 3-3 6"/><path d="M21 6 12 15"/><path d="m9 21-6-3 3-6"/><path d="M3 18l9-9"/>
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);
const ThumbsUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>
  </svg>
);
const ThumbsDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"/>
  </svg>
);
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);
const PaperclipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);
const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(generateSessionId);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Cmd+I to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Send end_session to n8n when chat is closed (triggers Zulip summary)
  const handleClose = async () => {
    setIsOpen(false);
    if (messages.length === 0) return;
    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, end_session: true }),
      });
    } catch {
      // silent — summary is best-effort
    }

    // Clean up local state for a fresh start next time
    setMessages([]);
    setSessionId(generateSessionId());
  };

  // Send message to n8n
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed, session_id: sessionId }),
      });

      if (!res.ok) throw new Error(`n8n returned ${res.status}`);
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: data.answer || 'No response received.' },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Something went wrong. Please try again.', error: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // ── Minimized button ───────────────────────────────────────────────────────
  if (!isOpen) {
    return (
      <button
        className={clsx(styles.chatbotContainer, styles.minimized)}
        onClick={() => setIsOpen(true)}
        aria-label="Open Assistant"
      >
        <SparklesIcon />
        <span>Ask AI</span>
      </button>
    );
  }

  // ── Open chat ──────────────────────────────────────────────────────────────
  return (
    <div className={styles.chatbotContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <SparklesIcon />
          Assistant
        </div>
        <div className={styles.controls}>
          <button className={styles.controlButton} aria-label="Expand">
            <ExpandIcon />
          </button>
          <button className={styles.controlButton} onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.messages}>
        {messages.length === 0 && !isLoading && (
          <div className={styles.botContent}>
            Welcome! How can I help you navigate the Greywall and Greyproxy documentation today?
          </div>
        )}

        {messages.map((msg, i) =>
          msg.role === 'user' ? (
            <div key={i} className={styles.messageUser}>
              {msg.content}
            </div>
          ) : (
            <div key={i} className={clsx(styles.messageBot, msg.error && styles.messageBotError)}>
              <div className={styles.progressItem}>
                <SearchIcon /> Searching documentation…
              </div>
              <div className={styles.botContent}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              <div className={styles.actions}>
                <button className={styles.actionBtn} title="Helpful">
                  <ThumbsUpIcon />
                </button>
                <button className={styles.actionBtn} title="Not helpful">
                  <ThumbsDownIcon />
                </button>
                <button
                  className={styles.actionBtn}
                  title={copiedIndex === i ? 'Copied!' : 'Copy'}
                  onClick={() => handleCopy(msg.content, i)}
                >
                  <CopyIcon />
                </button>
              </div>
            </div>
          )
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className={styles.messageBot}>
            <div className={styles.progressItem}>
              <SearchIcon /> Thinking…
            </div>
            <div className={styles.typingDots}>
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={styles.inputContainer}>
        <form className={styles.inputWrapper} onSubmit={handleSubmit}>
          <button type="button" className={styles.attachBtn}>
            <PaperclipIcon />
          </button>
          <input
            type="text"
            className={styles.textInput}
            placeholder="Ask a question…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
          <div className={styles.shortcut}>⌘I</div>
          <button type="submit" className={styles.submitBtn} disabled={isLoading || !query.trim()}>
            <ArrowUpIcon />
          </button>
        </form>
      </div>
    </div>
  );
}