import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Send, User, Bot, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { initGemini, sendMessage, sanitizeInput } from '../services/gemini.service';
import './Chat.css';

const SUGGESTED_QUESTIONS = [
  "What is the difference between Lok Sabha and Rajya Sabha?",
  "How does the EVM work?",
  "What is the Model Code of Conduct?",
  "Can I vote if I don't have a Voter ID card?"
];

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Namaste! 🙏 I am your India Election Assistant. Ask me anything about how elections work in India, voter registration, or electoral rules.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const messagesEndRef = useRef(null);

  // Initialize Gemini on mount or when API key changes
  useEffect(() => {
    if (apiKey) {
      initGemini(apiKey);
    }
  }, [apiKey]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async (text) => {
    const cleanText = sanitizeInput(text);
    if (!cleanText) return;
    
    if (!apiKey) {
      alert("Please enter a Google Gemini API Key first.");
      return;
    }

    const newMessages = [...messages, { role: 'user', content: cleanText }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Pass the message history (excluding the first welcome message and the current one)
      const history = messages.slice(1);
      const response = await sendMessage(cleanText, history);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', content: `Error: ${error.message}. Please check your API key.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const memoizedMessages = useMemo(() => messages.map((msg, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`message-item ${msg.role === 'user' ? 'message-user' : 'message-bot'}`}
      style={{ flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}
    >
      <div className="message-avatar" aria-hidden="true">
        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div 
        className="message-bubble"
        role="log"
        aria-label={`${msg.role === 'user' ? 'You' : 'Assistant'} says: ${msg.content}`}
      >
        {msg.content}
      </div>
    </motion.div>
  )), [messages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card chat-container"
      role="region"
      aria-label="Election Assistant Chat"
    >
      {/* Chat Header */}
      <header className="chat-header">
        <div className="chat-header-info">
          <div className="chat-bot-icon" aria-hidden="true">
            <MessageSquare size={20} />
          </div>
          <div>
            <h3 id="chat-title">AI Election Expert</h3>
            <span className="chat-status" aria-label="Status: Online and Non-partisan">
              <span className="chat-status-dot"></span>
              Online • Non-partisan
            </span>
          </div>
        </div>
        <span className="pill-info" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-color)', padding: '0.35rem 0.75rem', borderRadius: '2rem', border: '1px solid var(--border-solid)' }}>
          Powered by Gemini
        </span>
      </header>

      {/* API Key Banner */}
      {!import.meta.env.VITE_GEMINI_API_KEY && (
        <section className="api-key-banner" aria-label="API Key Setup">
          <label htmlFor="gemini-api-key" className="sr-only" style={{ fontSize: '0.8rem', color: '#92400E', fontWeight: 600 }}>API Key:</label>
          <span style={{ fontSize: '0.8rem', color: '#92400E', fontWeight: 600, whiteSpace: 'nowrap' }}>🔑 API Key:</span>
          <input 
            id="gemini-api-key"
            type="password" 
            placeholder="Paste your Gemini API Key here..." 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)}
            className="api-key-input"
            aria-label="Gemini API Key"
          />
        </section>
      )}

      {/* Chat Messages */}
      <div 
        className="messages-list" 
        aria-live="polite" 
        aria-atomic="false"
      >
        <AnimatePresence>
          {memoizedMessages}
        </AnimatePresence>

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="message-item message-bot"
            aria-label="Assistant is typing..."
          >
            <div className="message-avatar">
              <Bot size={16} />
            </div>
            <div className="message-bubble" style={{ display: 'flex', gap: '0.4rem' }}>
              <span className="animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--navy)', animationDelay: '0s' }}></span>
              <span className="animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--saffron)', animationDelay: '0.2s' }}></span>
              <span className="animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', animationDelay: '0.4s' }}></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <footer className="chat-input-area">
        {/* Suggested Chips */}
        {messages.length === 1 && (
          <nav className="suggestions-list" aria-label="Suggested questions">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <motion.button 
                key={idx} 
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSend(q)}
                className="suggestion-chip"
                aria-label={`Ask: ${q}`}
              >
                <Sparkles size={12} color="var(--saffron)" aria-hidden="true" />
                {q}
              </motion.button>
            ))}
          </nav>
        )}

        <form 
          className="chat-form"
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
        >
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Ask about Indian elections..." 
            className="input"
            disabled={isLoading}
            aria-label="Chat input"
            aria-describedby="chat-title"
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading || !input.trim()}
            style={{ borderRadius: '50%', width: '48px', height: '48px', padding: 0, flexShrink: 0 }}
            aria-label="Send message"
          >
            <Send size={18} aria-hidden="true" />
          </motion.button>
        </form>
      </footer>
    </motion.div>
  );
}

