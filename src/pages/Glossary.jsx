import { useState, useCallback, useMemo } from 'react';
import { glossary } from '../data/glossary';
import { Search, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sanitizeInput } from '../services/gemini.service';
import './Glossary.css';

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIdx, setExpandedIdx] = useState(null);

  const handleSearchChange = (e) => {
    // Sanitize input to prevent potential issues
    setSearchTerm(sanitizeInput(e.target.value));
  };

  const filteredGlossary = useMemo(() => 
    glossary.filter(item => 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const toggleExpand = useCallback((globalIdx) => {
    setExpandedIdx(prev => prev === globalIdx ? null : globalIdx);
  }, []);

  // Group by first letter
  const grouped = useMemo(() => filteredGlossary.reduce((acc, item) => {
    const letter = item.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {}), [filteredGlossary]);

  const sortedLetters = useMemo(() => Object.keys(grouped).sort(), [grouped]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="main"
      aria-label="Election Glossary"
    >
      {/* Header */}
      <header className="glossary-header">
        <div className="glossary-stats-badge" aria-label={`${glossary.length} total terms available`}>
          <BookOpen size={16} aria-hidden="true" /> {glossary.length} Terms
        </div>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>Election Glossary</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Understand the jargon. Search for any term related to Indian elections.</p>
      </header>

      {/* Search */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="search-container"
      >
        <input 
          type="text" 
          placeholder="Search terms (e.g., EVM, Lok Sabha, NOTA)..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className="input"
          style={{ paddingLeft: '3rem', fontSize: '1.05rem', borderRadius: 'var(--radius-xl)' }}
          aria-label="Search glossary terms"
        />
        <Search className="search-icon" size={20} aria-hidden="true" />
        {searchTerm && (
          <span className="search-count" aria-live="polite">
            {filteredGlossary.length} result{filteredGlossary.length !== 1 ? 's' : ''}
          </span>
        )}
      </motion.div>

      {/* Alphabet Quick Nav */}
      {!searchTerm && (
        <nav className="alphabet-nav" aria-label="Alphabetical navigation">
          {sortedLetters.map(letter => (
            <a 
              key={letter} 
              href={`#letter-${letter}`} 
              className="letter-nav-link"
              aria-label={`Jump to letter ${letter}`}
            >
              {letter}
            </a>
          ))}
        </nav>
      )}

      {/* Glossary Items - Grouped */}
      <section aria-label="Glossary categories">
        {sortedLetters.map(letter => (
          <div key={letter} id={`letter-${letter}`} className="letter-group">
            <div className="letter-group-header">
              <span className="letter-circle" aria-hidden="true">
                {letter}
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-solid)' }}></div>
            </div>

            <div className="glossary-items-list">
              {grouped[letter].map((item, idx) => {
                const globalIdx = `${letter}-${idx}`;
                const isExpanded = expandedIdx === globalIdx;
                return (
                  <motion.article 
                    key={globalIdx}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03 }}
                    className="glass-card glossary-item-card" 
                    onClick={() => toggleExpand(globalIdx)}
                    style={{ 
                      borderLeft: `4px solid ${isExpanded ? 'var(--saffron)' : 'var(--border-solid)'}`,
                    }}
                    role="button"
                    aria-expanded={isExpanded}
                    aria-controls={`def-${globalIdx}`}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleExpand(globalIdx); }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '1.1rem', color: 'var(--navy)', margin: 0 }}>{item.term}</h3>
                      {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          id={`def-${globalIdx}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p className="glossary-item-content">
                            {item.definition}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {filteredGlossary.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="no-results"
          aria-live="polite"
        >
          <Search size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} aria-hidden="true" />
          <p style={{ fontSize: '1.1rem' }}>No terms found for "<strong>{searchTerm}</strong>"</p>
          <p style={{ fontSize: '0.9rem' }}>Try a different keyword like EVM, NOTA, or Lok Sabha.</p>
        </motion.div>
      )}
    </motion.div>
  );
}

