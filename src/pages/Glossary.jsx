import { useState } from 'react';
import { glossary } from '../data/glossary';
import { Search, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIdx, setExpandedIdx] = useState(null);

  const filteredGlossary = glossary.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group by first letter
  const grouped = filteredGlossary.reduce((acc, item) => {
    const letter = item.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {});
  const sortedLetters = Object.keys(grouped).sort();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--surface-solid)', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '1.25rem', border: '1px solid var(--border-solid)', boxShadow: 'var(--shadow-sm)' }}>
          <BookOpen size={16} /> {glossary.length} Terms
        </div>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>Election Glossary</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Understand the jargon. Search for any term related to Indian elections.</p>
      </div>

      {/* Search */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ maxWidth: '600px', margin: '0 auto 3rem', position: 'relative' }}
      >
        <input 
          type="text" 
          placeholder="Search terms (e.g., EVM, Lok Sabha, NOTA)..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input"
          style={{ paddingLeft: '3rem', fontSize: '1.05rem', borderRadius: 'var(--radius-xl)' }}
        />
        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
        {searchTerm && (
          <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {filteredGlossary.length} result{filteredGlossary.length !== 1 ? 's' : ''}
          </span>
        )}
      </motion.div>

      {/* Alphabet Quick Nav */}
      {!searchTerm && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {sortedLetters.map(letter => (
            <a 
              key={letter} 
              href={`#letter-${letter}`} 
              style={{ 
                width: '32px', height: '32px', borderRadius: '8px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--surface-solid)', border: '1px solid var(--border-solid)',
                color: 'var(--navy)', fontWeight: 700, fontSize: '0.8rem',
                textDecoration: 'none', transition: 'all 0.2s'
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'white'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'var(--surface-solid)'; e.currentTarget.style.color = 'var(--navy)'; }}
            >
              {letter}
            </a>
          ))}
        </div>
      )}

      {/* Glossary Items - Grouped */}
      {sortedLetters.map(letter => (
        <div key={letter} id={`letter-${letter}`} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ 
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--navy) 0%, #3B82F6 100%)',
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '1rem', flexShrink: 0
            }}>
              {letter}
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-solid)' }}></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {grouped[letter].map((item, idx) => {
              const globalIdx = `${letter}-${idx}`;
              const isExpanded = expandedIdx === globalIdx;
              return (
                <motion.div 
                  key={globalIdx}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  className="glass-card" 
                  onClick={() => setExpandedIdx(isExpanded ? null : globalIdx)}
                  style={{ 
                    padding: '1.25rem 1.5rem', 
                    cursor: 'pointer',
                    borderLeft: `4px solid ${isExpanded ? 'var(--saffron)' : 'var(--border-solid)'}`,
                    transition: 'border-color 0.3s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--navy)', margin: 0 }}>{item.term}</h3>
                    {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-solid)' }}>
                          {item.definition}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {filteredGlossary.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}
        >
          <Search size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <p style={{ fontSize: '1.1rem' }}>No terms found for "<strong>{searchTerm}</strong>"</p>
          <p style={{ fontSize: '0.9rem' }}>Try a different keyword like EVM, NOTA, or Lok Sabha.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
