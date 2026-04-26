import { useState } from 'react';
import { electionTimeline } from '../data/election-steps';
import { Megaphone, FileText, Users, Vote, BarChart, Landmark, Activity, Circle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Live Dashboard Header */}
      <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center', marginBottom: '4rem', background: 'linear-gradient(135deg, rgba(30,58,138,0.9) 0%, rgba(15,23,42,0.95) 100%)', color: 'white' }}>
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.2)', color: '#FCA5A5', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: 600, border: '1px solid rgba(239, 68, 68, 0.4)', marginBottom: '1.5rem' }}
        >
          <Activity size={18} /> LIVE TRACKER
        </motion.div>
        <h2 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>Election Process Timeline</h2>
        <p style={{ color: '#CBD5E1', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Track the complete journey of the Indian democratic process. Click any phase to learn more.</p>
        
        {/* Dashboard Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '1rem', flex: '1 1 200px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
             <h4 style={{ color: 'var(--saffron-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Phases</h4>
             <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{electionTimeline.length}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '1rem', flex: '1 1 200px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
             <h4 style={{ color: 'var(--green-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Phase</h4>
             <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>Campaigning</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '1rem', flex: '1 1 200px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
             <h4 style={{ color: '#93C5FD', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Key Facts</h4>
             <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{electionTimeline.reduce((sum, t) => sum + (t.details?.length || 0), 0)}<span style={{fontSize: '1rem', color: '#94A3B8'}}>+</span></div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', paddingBottom: '4rem' }}>
        {/* Vertical Line */}
        <div style={{ position: 'absolute', left: '28px', top: '20px', bottom: '20px', width: '4px', background: 'linear-gradient(to bottom, var(--saffron) 0%, var(--green) 100%)', borderRadius: '4px', zIndex: 0, opacity: 0.3 }}></div>

        {electionTimeline.map((item, index) => {
          const Icon = iconMap[item.icon];
          const isActive = index === 2; // "Campaigning" as current
          const isExpanded = expandedIdx === index;

          return (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}
            >
              {/* Phase Icon */}
              <div style={{ 
                flexShrink: 0, width: '60px', height: '60px', borderRadius: '50%', 
                background: `linear-gradient(135deg, ${item.color} 0%, #333 150%)`, color: 'white', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                boxShadow: isActive ? `0 0 25px ${item.color}` : `0 4px 15px ${item.color}40`, 
                border: '4px solid var(--surface-solid)',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s'
              }}>
                {Icon && <Icon size={isActive ? 32 : 28} strokeWidth={2.5} />}
              </div>

              {/* Phase Card */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="glass-card" 
                style={{ 
                  padding: '2rem', flex: 1, 
                  borderLeft: `4px solid ${item.color}`,
                  background: isActive ? 'var(--surface-solid)' : 'var(--surface)',
                  boxShadow: isActive ? `0 10px 30px ${item.color}30` : 'var(--shadow-md)',
                  cursor: 'pointer'
                }}
                onClick={() => setExpandedIdx(isExpanded ? null : index)}
              >
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: item.color, letterSpacing: '1.5px', background: `${item.color}15`, padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>
                    {item.phase}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {isActive && (
                      <motion.span 
                        animate={{ opacity: [1, 0.5, 1] }} 
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <Circle size={8} fill="#EF4444" /> CURRENT
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
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-solid)' }}>
                        <h4 style={{ fontSize: '0.85rem', color: item.color, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          <Info size={14} /> Key Facts
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          {item.details.map((detail, dIdx) => (
                            <motion.li 
                              key={dIdx}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: dIdx * 0.1 }}
                              style={{ display: 'flex', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}
                            >
                              <span style={{ color: item.color, fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>▸</span>
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
