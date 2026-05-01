import { useState, useCallback, useMemo } from 'react';
import { electionTimeline } from '../data/election-steps';
import { Megaphone, FileText, Users, Vote, BarChart, Landmark, Activity, Circle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Timeline.css';

const iconMap = {
  Megaphone,
  FileText,
  Users,
  Vote,
  BarChart,
  Landmark
};

export default function Timeline() {
  const [expandedIdx, setExpandedIdx] = useState(null);

  const toggleExpand = useCallback((index) => {
    setExpandedIdx(prev => prev === index ? null : index);
  }, []);

  const timelineStats = useMemo(() => ({
    totalPhases: electionTimeline.length,
    totalFacts: electionTimeline.reduce((sum, t) => sum + (t.details?.length || 0), 0)
  }), []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      role="main"
      aria-label="Election Process Timeline"
    >
      {/* Live Dashboard Header */}
      <header className="glass-card timeline-header">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="live-tracker-badge"
          aria-label="Live Tracking Active"
        >
          <Activity size={18} aria-hidden="true" /> LIVE TRACKER
        </motion.div>
        <h2 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          Election Process Timeline
        </h2>
        <p style={{ color: '#CBD5E1', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Track the complete journey of the Indian democratic process. Select any phase to explore detailed steps.
        </p>
        
        {/* Dashboard Stats */}
        <section className="timeline-stats" aria-label="Election Statistics">
          <div className="stat-card">
             <h4 style={{ color: 'var(--saffron-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Phases</h4>
             <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{timelineStats.totalPhases}</div>
          </div>
          <div className="stat-card">
             <h4 style={{ color: 'var(--green-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Phase</h4>
             <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>Campaigning</div>
          </div>
          <div className="stat-card">
             <h4 style={{ color: '#93C5FD', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Key Facts</h4>
             <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{timelineStats.totalFacts}<span style={{fontSize: '1rem', color: '#94A3B8'}}>+</span></div>
          </div>
        </section>
      </header>

      <section className="timeline-container">
        {/* Vertical Line */}
        <div className="timeline-line" aria-hidden="true"></div>

        {electionTimeline.map((item, index) => {
          const Icon = iconMap[item.icon];
          const isActive = index === 2; // "Campaigning" as current
          const isExpanded = expandedIdx === index;

          return (
            <motion.article 
              key={index} 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="phase-item"
            >
              {/* Phase Icon */}
              <div 
                className="phase-icon-container"
                style={{ 
                  background: `linear-gradient(135deg, ${item.color} 0%, #333 150%)`,
                  boxShadow: isActive ? `0 0 25px ${item.color}` : `0 4px 15px ${item.color}40`, 
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                }}
                aria-hidden="true"
              >
                {Icon && <Icon size={isActive ? 32 : 28} strokeWidth={2.5} />}
              </div>

              {/* Phase Card */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="glass-card phase-card" 
                style={{ 
                  borderLeft: `4px solid ${item.color}`,
                  background: isActive ? 'var(--surface-solid)' : 'var(--surface)',
                  boxShadow: isActive ? `0 10px 30px ${item.color}30` : 'var(--shadow-md)',
                }}
                onClick={() => toggleExpand(index)}
                role="button"
                aria-expanded={isExpanded}
                aria-controls={`details-${index}`}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleExpand(index); }}
              >
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="phase-badge" style={{ color: item.color, background: `${item.color}15` }}>
                    {item.phase}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {isActive && (
                      <motion.span 
                        animate={{ opacity: [1, 0.5, 1] }} 
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="current-badge"
                      >
                        <Circle size={8} fill="#EF4444" aria-hidden="true" /> CURRENT
                      </motion.span>
                    )}
                    {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 style={{ fontSize: '1.5rem', marginTop: '0.25rem', marginBottom: '0.75rem', color: 'var(--navy)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{item.description}</p>

                {/* Expandable Details */}
                <AnimatePresence>
                  {isExpanded && item.details && (
                    <motion.div
                      id={`details-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="details-container">
                        <h4 className="fact-title" style={{ color: item.color }}>
                          <Info size={14} aria-hidden="true" /> Key Facts
                        </h4>
                        <ul className="fact-list">
                          {item.details.map((detail, dIdx) => (
                            <motion.li 
                              key={dIdx}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: dIdx * 0.1 }}
                              className="fact-item"
                            >
                              <span style={{ color: item.color, fontWeight: 700, flexShrink: 0, marginTop: '2px' }} aria-hidden="true">▸</span>
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.article>
          );
        })}
      </section>
    </motion.div>
  );
}

