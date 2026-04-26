import { useState } from 'react';
import { quizQuestions } from '../data/quiz-questions';
import { CheckCircle2, XCircle, RefreshCw, Trophy, Target, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const q = quizQuestions[currentQ];

  const handleSelect = (opt) => {
    if (showExplanation) return;
    setSelectedOpt(opt);
    setShowExplanation(true);
    if (opt === q.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setShowExplanation(false);
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  const pct = Math.round((score / quizQuestions.length) * 100);

  if (isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 2.5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(253,230,138,0.2) 50%, rgba(167,243,208,0.2) 100%)' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: pct >= 70 ? 'linear-gradient(135deg, var(--saffron) 0%, #EA580C 100%)' : 'linear-gradient(135deg, var(--navy) 0%, #3B82F6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: pct >= 70 ? '0 8px 25px var(--saffron-glow)' : '0 8px 25px var(--navy-glow)' }}>
              <Trophy size={36} color="white" />
            </div>
          </motion.div>

          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--navy)' }}>Quiz Complete!</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              <span className="text-gradient">{score}</span>
              <span style={{ fontSize: '2rem', color: 'var(--text-muted)' }}> / {quizQuestions.length}</span>
            </div>

            {/* Score bar */}
            <div style={{ maxWidth: '300px', margin: '0 auto 2rem', background: 'var(--border-solid)', borderRadius: '1rem', height: '10px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ height: '100%', borderRadius: '1rem', background: pct >= 70 ? 'linear-gradient(90deg, var(--saffron) 0%, var(--green) 100%)' : 'linear-gradient(90deg, var(--navy) 0%, #3B82F6 100%)' }} 
              />
            </div>

            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
              {score === quizQuestions.length ? "🎉 Perfect score! You're an election expert." : 
               score > quizQuestions.length / 2 ? "👏 Great job! You know a lot about Indian elections." : 
               "📚 Good attempt! Check out the Glossary to learn more."}
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary" 
              onClick={handleRestart}
            >
              <RefreshCw size={18} /> Take Quiz Again
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: '800px', margin: '0 auto' }}
    >
      {/* Progress Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Question {currentQ + 1} of {quizQuestions.length}
          </span>
          {/* Progress Bar */}
          <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.75rem' }}>
            {quizQuestions.map((_, idx) => (
              <motion.div 
                key={idx}
                animate={{ 
                  background: idx < currentQ ? 'var(--green)' : idx === currentQ ? 'var(--saffron)' : '#E2E8F0'
                }}
                style={{ 
                  height: '5px', 
                  flex: 1,
                  borderRadius: '3px', 
                  transition: 'background 0.3s'
                }} 
              />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--surface-solid)', border: '1px solid var(--border-solid)', padding: '0.4rem 0.8rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 600 }}>
            <Target size={14} color="var(--saffron)" /> {score} pts
          </div>
          <div style={{ background: 'var(--navy)', color: 'white', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-xl)', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Zap size={12} /> {q.level}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="glass-card" 
          style={{ padding: '2.5rem 2rem' }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--navy)', lineHeight: 1.4 }}>{q.question}</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {q.options.map((opt, idx) => {
              const isSelected = selectedOpt === opt;
              const isCorrect = opt === q.correctAnswer;
              
              let bg = 'var(--surface-solid)';
              let borderColor = 'var(--border-solid)';
              let textColor = 'var(--text-main)';
              let icon = null;

              if (showExplanation) {
                if (isCorrect) {
                  bg = '#DCFCE7'; borderColor = 'var(--green)'; textColor = '#166534';
                  icon = <CheckCircle2 size={20} color="var(--green)" />;
                } else if (isSelected && !isCorrect) {
                  bg = '#FEE2E2'; borderColor = '#EF4444'; textColor = '#991B1B';
                  icon = <XCircle size={20} color="#EF4444" />;
                }
              } else if (isSelected) {
                borderColor = 'var(--saffron)';
                bg = 'rgba(249, 115, 22, 0.05)';
              }

              return (
                <motion.button 
                  key={idx}
                  whileHover={!showExplanation ? { scale: 1.01, y: -1 } : {}}
                  whileTap={!showExplanation ? { scale: 0.99 } : {}}
                  onClick={() => handleSelect(opt)}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    width: '100%', 
                    padding: '1rem 1.25rem', 
                    textAlign: 'left', 
                    background: bg,
                    border: `2px solid ${borderColor}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: showExplanation ? 'default' : 'pointer',
                    color: textColor,
                    fontSize: '1.05rem',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                    boxShadow: isSelected && !showExplanation ? '0 0 0 3px var(--ring)' : 'none'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ 
                      width: '28px', height: '28px', borderRadius: '50%', 
                      background: isSelected ? (showExplanation ? (isCorrect ? 'var(--green)' : '#EF4444') : 'var(--saffron)') : 'var(--bg-color)', 
                      color: isSelected ? 'white' : 'var(--text-muted)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', fontWeight: 700, flexShrink: 0,
                      border: isSelected ? 'none' : '1.5px solid var(--border-solid)',
                      transition: 'all 0.2s'
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </span>
                  {icon}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--navy)', overflow: 'hidden' }}
              >
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--navy)', fontSize: '0.95rem' }}>💡 Explanation</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{q.explanation}</p>
                <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn btn-primary" 
                    onClick={handleNext}
                  >
                    {currentQ === quizQuestions.length - 1 ? "Finish Quiz 🎉" : "Next Question →"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
