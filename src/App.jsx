import { useState, lazy, Suspense } from 'react';
import { Home, Clock, ListChecks, MessageSquare, BookOpen, MapPin, Search, Menu, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import SkipLink from './components/SkipLink';
import HomePage from './pages/Home';
import { didYouKnowFacts } from './data/facts-myths';

// Lazy-loaded pages for efficiency (code splitting)
const TimelinePage = lazy(() => import('./pages/Timeline'));
const GuidePage = lazy(() => import('./pages/Guide'));
const ChatPage = lazy(() => import('./pages/Chat'));
const QuizPage = lazy(() => import('./pages/Quiz'));
const GlossaryPage = lazy(() => import('./pages/Glossary'));
const BoothFinderPage = lazy(() => import('./pages/BoothFinder'));

// Loading fallback component
function PageLoader() {
  return (
    <div role="status" aria-label="Loading page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', flexDirection: 'column', gap: '1rem' }}>
      <Loader2 size={32} className="animate-spin" style={{ color: 'var(--saffron)' }} />
      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading...</span>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'guide', label: 'Voting Guide', icon: ListChecks },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'quiz', label: 'Quiz', icon: BookOpen },
    { id: 'glossary', label: 'Glossary', icon: Search },
    { id: 'booth', label: 'Booth Finder', icon: MapPin },
  ];

  const handleNav = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    // Focus management for accessibility
    const main = document.getElementById('main-content');
    if (main) main.focus({ preventScroll: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomePage setActiveTab={setActiveTab} />;
      case 'timeline': return <TimelinePage />;
      case 'guide': return <GuidePage />;
      case 'chat': return <ChatPage />;
      case 'quiz': return <QuizPage />;
      case 'glossary': return <GlossaryPage />;
      case 'booth': return <BoothFinderPage />;
      default: return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <ErrorBoundary>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SkipLink />
        
        {/* Tricolor accent */}
        <div className="tricolor-bar" role="presentation" aria-hidden="true"></div>

        {/* Ticker */}
        <div className="ticker-wrap" role="marquee" aria-label="Did you know facts about Indian elections">
          <div className="ticker-content">
            {didYouKnowFacts.map((fact, index) => (
              <span key={index} className="ticker-item">
                🇮🇳 DID YOU KNOW? {fact}
              </span>
            ))}
            {didYouKnowFacts.map((fact, index) => (
              <span key={`dup-${index}`} className="ticker-item" aria-hidden="true">
                🇮🇳 DID YOU KNOW? {fact}
              </span>
            ))}
          </div>
        </div>

        {/* Header & Nav */}
        <header className="glass" role="banner" style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--border-solid)' }}>
          <div className="container" style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} 
              onClick={() => handleNav('home')}
              role="button"
              tabIndex={0}
              aria-label="Go to homepage"
              onKeyDown={(e) => { if (e.key === 'Enter') handleNav('home'); }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--saffron) 0%, #EA580C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 12px var(--saffron-glow)' }}>
                <VoteIcon />
              </div>
              <div>
                <h1 style={{ fontSize: '1.4rem', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2 }} className="text-gradient">India Election Assistant</h1>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Voter Awareness Platform</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav aria-label="Main navigation" style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', flexWrap: 'nowrap' }} className="desktop-nav">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`nav-pill ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="mobile-menu-btn"
              style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden', borderTop: '1px solid var(--border-solid)', background: 'var(--surface-solid)' }}
              >
                <nav aria-label="Mobile navigation" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className={`nav-pill ${isActive ? 'active' : ''}`}
                        style={{ justifyContent: 'flex-start' }}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon size={16} aria-hidden="true" />
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Main Content */}
        <main id="main-content" tabIndex={-1} style={{ flex: 1, padding: '2.5rem 0', outline: 'none' }} role="main">
          <div className="container">
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer" role="contentinfo">
          <div className="container">
            <div className="footer-grid">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--saffron) 0%, #EA580C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <VoteIcon />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>India Election Assistant</h3>
                </div>
                <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '350px' }}>
                  An open, non-partisan platform to educate voters about the Indian electoral process. Built for civic awareness and democratic empowerment.
                </p>

              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#CBD5E1', marginBottom: '1rem' }}>Features</h4>
                <ul className="footer-links">
                  <li onClick={() => handleNav('timeline')}>Election Timeline</li>
                  <li onClick={() => handleNav('guide')}>Voting Guide</li>
                  <li onClick={() => handleNav('chat')}>AI Assistant</li>
                  <li onClick={() => handleNav('quiz')}>Election Quiz</li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#CBD5E1', marginBottom: '1rem' }}>Resources</h4>
                <ul className="footer-links">
                  <li onClick={() => handleNav('glossary')}>Election Glossary</li>
                  <li onClick={() => handleNav('booth')}>Booth Finder</li>
                  <li><a href="https://www.eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', textDecoration: 'none' }}>ECI Official Site ↗</a></li>
                  <li><a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', textDecoration: 'none' }}>Voter Portal ↗</a></li>
                </ul>
              </div>
            </div>



            <div className="footer-bottom">
              <p style={{ color: '#64748B', fontSize: '0.8rem' }}>© 2026 India Election Assistant — Hackathon Project for Voter Awareness</p>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Made with 🇮🇳 in India</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Inline responsive styles */}
        <style>{`
          @media (max-width: 900px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: block !important; }
          }
          @media (min-width: 901px) {
            .mobile-menu-btn { display: none !important; }
          }
          /* Accessibility: visible focus rings */
          :focus-visible {
            outline: 3px solid var(--saffron);
            outline-offset: 2px;
          }
          button:focus:not(:focus-visible),
          a:focus:not(:focus-visible) {
            outline: none;
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
}

function VoteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 12 2 2 4-4"/>
      <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"/>
      <path d="M22 19H2"/>
    </svg>
  );
}

export default App;
