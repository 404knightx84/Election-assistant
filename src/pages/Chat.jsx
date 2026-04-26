import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SUGGESTED_QUESTIONS = [
  "What is the difference between Lok Sabha and Rajya Sabha?",
  "How does the EVM work?",
  "What is the Model Code of Conduct?",
  "Can I vote if I don't have a Voter ID card?"
];

const SYSTEM_PROMPT = `You are the India Election Assistant, an expert on the Indian electoral process. 
Your goal is to educate users about how elections work in India.
Follow these rules:
1. Answer ONLY questions related to Indian elections, the Election Commission of India, electoral history, voting rights, and processes.
2. If asked about off-topic subjects (like programming, general knowledge outside politics, or non-Indian elections), politely decline and steer the conversation back to Indian elections.
3. Be strictly non-partisan. Do not express opinions on political parties, candidates, or current political controversies. Provide factual, objective information.
4. Use simple, plain English that is easy for a beginner to understand. Explain jargon like 'EVM', 'NOTA', or 'Delimitation' if you use them.
5. Keep your responses concise (under 200 words if possible) unless a detailed explanation is requested.`;

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Namaste! 🙏 I am your India Election Assistant. Ask me anything about how elections work in India, voter registration, or electoral rules.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    if (!apiKey) {
      alert("Please enter a Google Gemini API Key first.");
      return;
    }

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: SYSTEM_PROMPT 
      });

      const history = newMessages.slice(1, -1).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const result = await chat.sendMessage(text);
      const response = await result.response;
      const textResponse = response.text();

      setMessages(prev => [...prev, { role: 'model', content: textResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 220px)', minHeight: '550px' }}
      className="glass-card"
    >
      {/* Chat Header */}
      <div style={{ 
        padding: '1.25rem 1.5rem', 
        borderBottom: '1px solid var(--border-solid)', 
        background: 'linear-gradient(135deg, rgba(30,58,138,0.05) 0%, rgba(249,115,22,0.05) 100%)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--navy) 0%, #3B82F6 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--navy)' }}>AI Election Expert</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }}></span>
              Online • Non-partisan
            </span>
          </div>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-color)', padding: '0.35rem 0.75rem', borderRadius: '2rem', border: '1px solid var(--border-solid)' }}>Powered by Gemini</span>
      </div>

      {/* API Key Banner */}
      {!import.meta.env.VITE_GEMINI_API_KEY && (
        <div style={{ background: '#FFFBEB', borderBottom: '1px solid #FEF3C7', padding: '0.6rem 1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#92400E', fontWeight: 600, whiteSpace: 'nowrap' }}>🔑 API Key:</span>
          <input 
            type="password" 
            placeholder="Paste your Gemini API Key here..." 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)}
            style={{ flex: 1, padding: '0.35rem 0.6rem', borderRadius: '6px', border: '1px solid #FDE68A', fontSize: '0.8rem', background: 'white' }}
          />
        </div>
      )}

      {/* Chat Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}
            >
              <div style={{ 
                width: '34px', height: '34px', borderRadius: '10px', 
                background: msg.role === 'user' ? 'linear-gradient(135deg, var(--saffron) 0%, #EA580C 100%)' : 'linear-gradient(135deg, var(--navy) 0%, #3B82F6 100%)', 
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
              }}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div style={{ 
                background: msg.role === 'user' ? 'linear-gradient(135deg, var(--saffron) 0%, #EA580C 100%)' : 'var(--surface-solid)', 
                color: msg.role === 'user' ? 'white' : 'var(--text-main)',
                border: msg.role === 'user' ? 'none' : '1px solid var(--border-solid)',
                padding: '0.9rem 1.15rem', 
                borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                maxWidth: '75%',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                boxShadow: 'var(--shadow-sm)',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}
          >
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--navy) 0%, #3B82F6 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={16} />
            </div>
            <div style={{ padding: '0.9rem 1.15rem', background: 'var(--surface-solid)', border: '1px solid var(--border-solid)', borderRadius: '1rem 1rem 1rem 0.25rem', display: 'flex', gap: '0.4rem' }}>
              <span className="animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--navy)', animationDelay: '0s' }}></span>
              <span className="animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--saffron)', animationDelay: '0.2s' }}></span>
              <span className="animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', animationDelay: '0.4s' }}></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border-solid)', background: 'rgba(248, 250, 252, 0.8)' }}>
        {/* Suggested Chips */}
        {messages.length === 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <motion.button 
                key={idx} 
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSend(q)}
                style={{ background: 'var(--surface-solid)', border: '1.5px solid var(--border-solid)', padding: '0.5rem 0.9rem', borderRadius: 'var(--radius-xl)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)', transition: 'all 0.2s', fontFamily: 'inherit' }}
              >
                <Sparkles size={12} color="var(--saffron)" />
                {q}
              </motion.button>
            ))}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} style={{ display: 'flex', gap: '0.75rem' }}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Ask about Indian elections..." 
            className="input"
            disabled={isLoading}
            style={{ borderRadius: 'var(--radius-xl)', padding: '0.85rem 1.25rem' }}
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading || !input.trim()}
            style={{ borderRadius: '50%', width: '48px', height: '48px', padding: 0, flexShrink: 0 }}
          >
            <Send size={18} />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
