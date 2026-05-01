import { useState, useCallback, useMemo } from 'react';
import { voterGuideSteps } from '../data/election-steps';
import { CheckCircle2, Circle, Lightbulb, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Guide.css';

export default function Guide() {
  const [activeStep, setActiveStep] = useState(0);

  const getStepImage = useCallback((stepId) => {
    if (stepId <= 3) return "/assets/registration.png";
    if (stepId >= 6 && stepId <= 7) return "/assets/evm.png";
    if (stepId === 8) return "/assets/hero.png";
    return "/assets/voter-card.png";
  }, []);

  const currentStep = useMemo(() => voterGuideSteps[activeStep], [activeStep]);
  const progress = useMemo(() => ((activeStep + 1) / voterGuideSteps.length) * 100, [activeStep]);

  const handleStepSelect = useCallback((index) => {
    setActiveStep(index);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="main"
      aria-label="Voter's Step-by-Step Guide"
    >
      {/* Header */}
      <header className="guide-header">
        <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>Voter's Step-by-Step Guide</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Follow these {voterGuideSteps.length} steps to exercise your right to vote.</p>
        
        {/* Overall Progress */}
        <div className="progress-container" aria-label={`Overall progress: ${Math.round(progress)}%`}>
          <div className="progress-bar-bg" aria-hidden="true">
            <motion.div 
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              className="progress-bar-fill"
            />
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)', whiteSpace: 'nowrap' }}>
            {activeStep + 1}/{voterGuideSteps.length}
          </span>
        </div>
      </header>

      <div className="guide-layout">
        {/* Stepper Navigation */}
        <nav className="glass-card stepper-nav" aria-label="Steps list">
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', color: 'var(--navy)' }}>Voting Process</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {voterGuideSteps.map((step, index) => {
                const isActive = activeStep === index;
                const isCompleted = activeStep > index;
                return (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={step.id} 
                    onClick={() => handleStepSelect(index)}
                    className="step-nav-item"
                    style={{ 
                      background: isActive ? 'rgba(249, 115, 22, 0.08)' : 'transparent',
                      border: isActive ? '1.5px solid var(--saffron)' : '1.5px solid transparent',
                    }}
                    role="button"
                    aria-current={isActive ? 'step' : undefined}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleStepSelect(index); }}
                    aria-label={`Step ${step.id}: ${step.title}`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={20} color="var(--green)" aria-hidden="true" />
                    ) : isActive ? (
                      <div className="step-number-circle" style={{ background: 'var(--saffron)' }} aria-hidden="true">
                        {step.id}
                      </div>
                    ) : (
                      <Circle size={20} color="#CBD5E1" aria-hidden="true" />
                    )}
                    <span style={{ 
                      fontWeight: isActive ? 600 : 400, 
                      color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                      fontSize: '0.9rem'
                    }}>
                      {step.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Step Details */}
        <section className="step-details-container" aria-live="polite">
          <div className="glass-card step-card">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ flex: 1 }}
              >
                {/* Step badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'inline-block', padding: '0.3rem 0.85rem', background: 'linear-gradient(135deg, var(--saffron) 0%, #EA580C 100%)', color: 'white', borderRadius: 'var(--radius-xl)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    STEP {currentStep.id} OF {voterGuideSteps.length}
                  </div>
                </div>

                {/* Title */}
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--navy)', lineHeight: 1.3 }}>{currentStep.title}</h2>
                
                {/* Description */}
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  {currentStep.description}
                </p>

                {/* Tips Section */}
                {currentStep.tips && currentStep.tips.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="tip-box"
                  >
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--green)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <Lightbulb size={16} aria-hidden="true" /> Did You Know?
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {currentStep.tips.map((tip, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.5 }}
                        >
                          <span style={{ color: 'var(--green)', fontWeight: 700, flexShrink: 0 }} aria-hidden="true">✓</span>
                          {tip}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Image Illustration */}
                {getStepImage(currentStep.id) && (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="illustration-box"
                  >
                    <img 
                      src={getStepImage(currentStep.id)} 
                      alt={`Illustration for ${currentStep.title}`} 
                      style={{ maxWidth: '100%', maxHeight: '160px', filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.06))' }} 
                    />
                  </motion.div>
                )}
              </motion.article>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-solid)' }} aria-label="Step navigation">
              <button 
                className="btn btn-secondary" 
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                style={{ opacity: activeStep === 0 ? 0.4 : 1 }}
                aria-label="Previous step"
              >
                <ArrowLeft size={16} aria-hidden="true" /> Previous
              </button>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {Math.round(progress)}% Complete
              </span>
              <button 
                className="btn btn-primary" 
                disabled={activeStep === voterGuideSteps.length - 1}
                onClick={() => setActiveStep(prev => Math.min(voterGuideSteps.length - 1, prev + 1))}
                style={{ opacity: activeStep === voterGuideSteps.length - 1 ? 0.4 : 1 }}
                aria-label={activeStep === voterGuideSteps.length - 1 ? "Guide completed" : "Next step"}
              >
                {activeStep === voterGuideSteps.length - 1 ? '✅ Done' : <>Next <ArrowRight size={16} aria-hidden="true" /></>}
              </button>
            </nav>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

