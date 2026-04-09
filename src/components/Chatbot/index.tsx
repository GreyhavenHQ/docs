import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// --- Icons ---
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    <path d="M20 3v4"/>
    <path d="M22 5h-4"/>
    <path d="M4 17v2"/>
    <path d="M5 18H3"/>
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

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
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

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 9h8"/><path d="M8 13h6"/><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12z"/>
  </svg>
);


export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  
  // Example state to toggle mock responses
  const [hasSearched, setHasSearched] = useState(false);

  // Allow command+I globally to start
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setHasSearched(true);
  };

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
          <button className={styles.controlButton} onClick={() => setIsOpen(false)} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Messages / Results area */}
      <div className={styles.messages}>
        {hasSearched ? (
          <>
            <div className={styles.messageUser}>{query}</div>
            
            <div className={styles.messageBot}>
              <div className={styles.progressItem}>
                <SearchIcon /> Read 1 file
              </div>
              <div className={styles.progressItem}>
                <SearchIcon /> Found results for {query.split(' ')[query.split(' ').length - 1]?.replace('?', '') || 'query'}
              </div>

              <div className={styles.botContent}>
                <p>You can find information about <strong>{query.split(' ')[query.split(' ').length - 1]?.replace('?', '') || 'the topic'}</strong> in several places in the Greyhaven documentation:</p>
                
                <ul className={styles.searchResultsList}>
                  <li className={styles.searchResultItem}>
                    <span className={styles.searchResultBullet}>•</span>
                    <div className={styles.searchResultText}>
                      <a href="/greywall/configuration" className={styles.searchResultLink}>Greywall Configuration</a> — Explains how to set up <span className={styles.resultBadge}>greywall.yaml</span> to configure default policies.
                    </div>
                  </li>
                  <li className={styles.searchResultItem}>
                    <span className={styles.searchResultBullet}>•</span>
                    <div className={styles.searchResultText}>
                      <a href="/greyproxy/configuration" className={styles.searchResultLink}>Greyproxy Setup (Guide)</a> — Shows how to configure SOCKS5/HTTP routing and proxy rules.
                    </div>
                  </li>
                  <li className={styles.searchResultItem}>
                    <span className={styles.searchResultBullet}>•</span>
                    <div className={styles.searchResultText}>
                      <a href="/greyproxy/using-with-greywall" className={styles.searchResultLink}>Using Greyproxy with Greywall</a> — A guide on how they fit together to route sandboxed traffic.
                    </div>
                  </li>
                </ul>

                <div className={styles.bottomLinks}>
                  <a href="/greywall/quickstart" className={styles.bottomLink}>Quickstart guide</a>
                  <a href="/greywall/configuration" className={styles.bottomLink}>Greywall Configuration</a>
                  <a href="/greyproxy/configuration" className={styles.bottomLink}>Greyproxy Configuration</a>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.actionBtn}><ThumbsUpIcon /></button>
                <button className={styles.actionBtn}><ThumbsDownIcon /></button>
                <button className={styles.actionBtn}><CopyIcon /></button>
                <button className={styles.actionBtn}><RefreshIcon /></button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.botContent}>
            Welcome! How can I help you navigate the Greywall and Greyproxy documentation today?
          </div>
        )}
      </div>

      {/* Input area */}
      <div className={styles.inputContainer}>
        <form className={styles.inputWrapper} onSubmit={handleSubmit}>
          <button type="button" className={styles.attachBtn}>
            <PaperclipIcon />
          </button>
          <input 
            type="text" 
            className={styles.textInput} 
            placeholder="Ask a question..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className={styles.shortcut}>
            ⌘I
          </div>
          <button type="submit" className={styles.submitBtn}>
            <ArrowUpIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
