import { useState } from 'react';
import { voterGuideSteps } from '../data/election-steps';
import { CheckCircle2, Circle, Lightbulb, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Guide() {
  const [activeStep, setActiveStep] = useState(0);

  const getStepImage = (stepId) => {
    if (stepId <= 3) return "/assets/registration.png";
    if (stepId >= 6 && stepId <= 7) return "/assets/evm.png";
    if (stepId === 8) return "/assets/hero.png";
    return "/assets/voter-card.png";
  };

  const currentStep = voterGuideSteps[activeStep];
  const progress = ((activeStep + 1) / voterGuideSteps.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>Voter's Step-by-Step Guide</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Follow these {voterGuideSteps.length} steps to exercise your right to vote.</p>
        {/* Overall Progress */}
        <div style={{ maxWidth: '400px', margin: '1.5rem auto 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'var(--border-solid)', overflow: 'hidden' }}>
            <motion.div 
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              style={{ height: '100%', borderRadius: '3px', background: 'linear-gradient(90deg, var(--saffron) 0%, var(--green) 100%)' }}
            />
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{activeStep + 1}/{voterGuideSteps.length}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Stepper Navigation */}
        <div style={{ flex: '1 1 280px' }} className="glass-card">
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
                    onClick={() => setActiveStep(index)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      cursor: 'pointer',
                      padding: '0.65rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'rgba(249, 115, 22, 0.08)' : 'transparent',
                      border: isActive ? '1.5px solid var(--saffron)' : '1.5px solid transparent',
                      transition: 'all 0.2s'
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={20} color="var(--green)" />
                    ) : isActive ? (
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.65rem', fontWeight: 800 }}>{step.id}</div>
                    ) : (
                      <Circle size={20} color="#CBD5E1" />
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
        </div>

        {/* Step Details */}
        <div style={{ flex: '2 1 500px' }}>
          <div className="glass-card" style={{ padding: '2.5rem 2rem', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
            
            <AnimatePresence mode="wait">
              <motion.div
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
                    style={{ background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--green)' }}
                  >
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--green)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <Lightbulb size={16} /> Did You Know?
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
                          <span style={{ color: 'var(--green)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                          {tip}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Image */}
                {getStepImage(currentStep.id) && (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ textAlign: 'center', margin: '1rem 0', background: 'linear-gradient(135deg, rgba(253,230,138,0.15) 0%, rgba(167,243,208,0.15) 100%)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}
                  >
                    <img 
                      src={getStepImage(currentStep.id)} 
                      alt="Step Illustration" 
                      style={{ maxWidth: '100%', maxHeight: '160px', filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.06))' }} 
                    />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-solid)' }}>
              <button 
                className="btn btn-secondary" 
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                style={{ opacity: activeStep === 0 ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {Math.round(progress)}% Complete
              </span>
              <button 
                className="btn btn-primary" 
                disabled={activeStep === voterGuideSteps.length - 1}
                onClick={() => setActiveStep(prev => Math.min(voterGuideSteps.length - 1, prev + 1))}
                style={{ opacity: activeStep === voterGuideSteps.length - 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {activeStep === voterGuideSteps.length - 1 ? '✅ Done' : <>Next <ArrowRight size={16} /></>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
