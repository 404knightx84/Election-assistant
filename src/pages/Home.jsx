import { Clock, ListChecks, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home({ setActiveTab }) {
  // Only keeping Timeline and Guide for the homepage
  const cards = [
    { id: 'timeline', title: 'Live Election Process', desc: 'Track real-time phases from announcement to results.', icon: Activity, color: 'var(--saffron)' },
    { id: 'guide', title: 'Step-by-Step Guide', desc: 'How to register and cast your vote on EVMs.', icon: ListChecks, color: 'var(--green)' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}
    >
      {/* Hero Section */}
      <motion.div 
        className="glass-card" 
        whileHover={{ y: -5, boxShadow: "var(--shadow-lg), var(--shadow-glow)" }}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '3rem', 
          padding: '4rem', 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(253, 230, 138, 0.25) 50%, rgba(167, 243, 208, 0.25) 100%)', 
          position: 'relative',
          overflow: 'hidden',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'var(--saffron-glow)', filter: 'blur(80px)', borderRadius: '50%', zIndex: -1 }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '20%', width: '300px', height: '300px', background: 'var(--green-glow)', filter: 'blur(80px)', borderRadius: '50%', zIndex: -1 }}></div>
        <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '300px', height: '300px', background: 'var(--navy-glow)', filter: 'blur(80px)', borderRadius: '50%', zIndex: -1 }}></div>

        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ flex: '1 1 400px', zIndex: 1, textAlign: 'left' }}
        >
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--surface-solid)', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '1.5rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)'}}>
            <span style={{fontSize: '1.2rem'}}>🇮🇳</span> Election Process
          </div>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1.25rem', color: 'var(--navy)', lineHeight: 1.1 }} className="text-gradient-navy">
            Democracy In <br/>
            <span className="text-gradient">Your Hands</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '500px', marginBottom: '2.5rem', fontWeight: 400, lineHeight: 1.6 }}>
            Your comprehensive guide to the Indian electoral process. Explore the timeline, check voter requirements, find your booth, or ask our non-partisan AI assistant.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary" 
              style={{ padding: '1rem 2rem', fontSize: '1.05rem' }} 
              onClick={() => setActiveTab('guide')}
            >
              Start Voter Guide
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary" 
              style={{ padding: '1rem 2rem', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} 
              onClick={() => setActiveTab('timeline')}
            >
              <Clock size={18} /> View Timeline
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}
        >
          <img src="/assets/hero.png" alt="Indian Election Hero" style={{ width: '100%', maxWidth: '500px', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.08))', borderRadius: '1rem' }} />
        </motion.div>
      </motion.div>

      {/* Featured Educational Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
         <motion.div 
           className="glass-card" 
           whileHover={{ y: -5 }}
           style={{ padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(253, 230, 138, 0.4) 100%)' }}
         >
            <div style={{flex: 1}}>
              <h3 style={{fontSize: '1.75rem', marginBottom: '0.75rem', color: '#D97706'}}>Election Process</h3>
              <p style={{color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1rem'}}>Follow the live chronological timeline of the democratic process.</p>
              <button className="btn btn-secondary" style={{padding: '0.75rem 1.5rem', fontSize: '0.95rem'}} onClick={() => setActiveTab('timeline')}>
                View Process <ChevronRight size={16} />
              </button>
            </div>
            <div style={{flex: 1, textAlign: 'center'}}>
               <img src="/assets/timeline.png" alt="Process Timeline" style={{maxWidth: '100%', maxHeight: '180px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.05))'}} />
            </div>
         </motion.div>

         <motion.div 
           className="glass-card" 
           whileHover={{ y: -5 }}
           style={{ padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(167, 243, 208, 0.4) 100%)' }}
         >
            <div style={{flex: 1}}>
              <h3 style={{fontSize: '1.75rem', marginBottom: '0.75rem', color: '#059669'}}>Voter Registration</h3>
              <p style={{color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1rem'}}>Ensure you are registered and ready to cast your vote.</p>
              <button className="btn btn-secondary" style={{padding: '0.75rem 1.5rem', fontSize: '0.95rem'}} onClick={() => setActiveTab('guide')}>
                Start Guide <ChevronRight size={16} />
              </button>
            </div>
            <div style={{flex: 1, textAlign: 'center'}}>
               <img src="/assets/registration.png" alt="Registration" style={{maxWidth: '100%', maxHeight: '180px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.05))'}} />
            </div>
         </motion.div>
      </div>

      {/* Feature Navigation - Limited to Timeline & Guide per Request */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h3 style={{ fontSize: '2.2rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--navy)' }}>Quick Access</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div 
                key={card.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-card feature-card" 
                style={{ flex: '1 1 300px', maxWidth: '400px', padding: '2.5rem 2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', textAlign: 'center' }}
                onClick={() => setActiveTab(card.id)}
              >
                <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: `linear-gradient(135deg, ${card.color}15 0%, ${card.color}30 100%)`, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 16px ${card.color}20` }}>
                  <Icon size={36} strokeWidth={2} />
                </div>
                <h4 style={{ fontSize: '1.4rem', color: 'var(--navy)' }}>{card.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.5 }}>{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
