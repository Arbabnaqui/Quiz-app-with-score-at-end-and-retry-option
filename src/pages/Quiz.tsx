import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { getQuestionsByLevel, Question, QuizLevel } from '../data/quizData'

// Simple loading component
const LoadingIndicator = () => (
  <div className="loading">
    <div></div>
    <div></div>
    <div></div>
  </div>
)

// Simple background that always works
const SimpleBackground = () => (
  <div className="bg-shapes">
    <div className="circle c1"></div>
    <div className="circle c2"></div>
    <div className="circle c3"></div>
  </div>
)

const Quiz = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const quizLevel = (location.state?.level as QuizLevel) || 'easy'
  
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [autoAdvance, setAutoAdvance] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [answered, setAnswered] = useState<boolean[]>([])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  
  // Load questions based on selected level
  useEffect(() => {
    const loadQuestions = () => {
      try {
        setIsLoading(true)
        // Get questions synchronously to avoid delays
        const questions = getQuestionsByLevel(quizLevel)
        setQuizQuestions(questions)
        setAnswered(new Array(questions.length).fill(false))
        setIsLoading(false)
      } catch (err) {
        console.error('Error loading questions:', err)
        // Fallback to an empty array so we can show an error
        setQuizQuestions([])
        setIsLoading(false)
      }
    }
    
    loadQuestions()
  }, [quizLevel])
  
  // Define reusable animation variants (simplified)
  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  }), [])

  const optionVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { duration: 0.1, delay: 0.05 * i }
    }),
    selected: { 
      scale: 1.03,
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    },
    correct: { 
      scale: 1.05,
      backgroundColor: '#4CAF50',
      boxShadow: '0 0 20px rgba(76, 175, 80, 0.5)',
      transition: { type: 'spring', stiffness: 300, damping: 10 }
    },
    incorrect: { 
      scale: 0.98,
      backgroundColor: '#F44336',
      boxShadow: '0 0 20px rgba(244, 67, 54, 0.5)',
      transition: { type: 'spring', stiffness: 300, damping: 10 }
    }
  }), [])
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!quizQuestions.length || !quizQuestions[currentQuestionIndex]) return
      
      // Number keys 1-4 for option selection
      if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1
        if (optionIndex < quizQuestions[currentQuestionIndex].options.length) {
          handleOptionSelect(optionIndex)
        }
      }
      
      // Space or Enter to advance
      if ((e.key === ' ' || e.key === 'Enter') && selectedOption !== null) {
        handleNextQuestion()
      }
      
      // Right arrow for next question
      if (e.key === 'ArrowRight') {
        handleSkipQuestion()
      }
      
      // Left arrow for previous question
      if (e.key === 'ArrowLeft') {
        handlePreviousQuestion()
      }
      
      // Escape to return to home
      if (e.key === 'Escape') {
        if (answers.some(a => a !== null)) {
          setShowConfirmDialog(true)
        } else {
          navigate('/')
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentQuestionIndex, selectedOption, quizQuestions, answers])
  
  // Return to home if no level is selected
  useEffect(() => {
    if (!location.state?.level) {
      navigate('/')
    }
  }, [location, navigate])
  
  // Show loading state
  if (isLoading) {
    return (
      <>
        <SimpleBackground />
        <div className="page">
          <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
            <LoadingIndicator />
            <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>Loading {quizLevel} questions...</div>
          </div>
        </div>
      </>
    )
  }
  
  // Show error state if no questions
  if (quizQuestions.length === 0) {
    return (
      <>
        <SimpleBackground />
        <div className="page">
          <div className="card" style={{ padding: '30px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px', color: '#F44336' }}>Error</h2>
            <p>No questions available for this level. Please try a different level.</p>
            <button 
              className="button" 
              onClick={() => navigate('/')}
              style={{ marginTop: '20px' }}
            >
              Return to Home
            </button>
          </div>
        </div>
      </>
    )
  }
  
  const currentQuestion: Question = quizQuestions[currentQuestionIndex]
  
  const handleOptionSelect = (optionIndex: number) => {
    if (isTransitioning || answered[currentQuestionIndex]) return
    
    setSelectedOption(optionIndex)
    
    // Mark this question as answered
    const newAnswered = [...answered]
    newAnswered[currentQuestionIndex] = true
    setAnswered(newAnswered)
    
    // Auto advance if option is selected
    if (autoAdvance) {
      const isCorrect = optionIndex === currentQuestion.correctAnswer
      
      if (isCorrect) {
        setScore(score + 1)
      }
      
      // Save answer
      const newAnswers = [...answers]
      newAnswers[currentQuestionIndex] = optionIndex
      setAnswers(newAnswers)
      
      // Reduced delay to show animation first - from 700ms to 300ms
      setTimeout(() => {
        // Advance to next question
        setIsTransitioning(true)
        setTimeout(() => {
          if (currentQuestionIndex + 1 < quizQuestions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setSelectedOption(null)
          } else {
            // End quiz
            navigate('/results', { 
              state: { 
                score: isCorrect ? score + 1 : score,
                totalQuestions: quizQuestions.length,
                answers: newAnswers,
                level: quizLevel,
                questions: quizQuestions
              } 
            })
          }
          setIsTransitioning(false)
        }, 150) // Reduced from 300ms to 150ms
      }, 300) // Reduced from 700ms to 300ms
    } else {
      // Save answer without advancing
      const newAnswers = [...answers]
      newAnswers[currentQuestionIndex] = optionIndex
      setAnswers(newAnswers)
      
      // Update score if answer is correct
      if (optionIndex === currentQuestion.correctAnswer) {
        setScore(score + 1)
      }
    }
  }
  
  const handleNextQuestion = () => {
    if (isTransitioning || selectedOption === null) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      if (currentQuestionIndex + 1 < quizQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedOption(null)
      } else {
        // End quiz
        navigate('/results', { 
          state: { 
            score: score,
            totalQuestions: quizQuestions.length,
            answers: answers,
            level: quizLevel,
            questions: quizQuestions
          } 
        })
      }
      setIsTransitioning(false)
    }, 100) // Reduced from 250ms to 100ms
  }
  
  const handleSkipQuestion = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      if (currentQuestionIndex + 1 < quizQuestions.length) {
        // Add null as answer for skipped question
        const newAnswers = [...answers]
        if (newAnswers[currentQuestionIndex] === undefined) {
          newAnswers[currentQuestionIndex] = null
        }
        setAnswers(newAnswers)
        
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedOption(null)
      } else {
        // End of quiz
        navigate('/results', { 
          state: { 
            score: score,
            totalQuestions: quizQuestions.length,
            answers: answers,
            level: quizLevel,
            questions: quizQuestions
          } 
        })
      }
      setIsTransitioning(false)
    }, 100) // Reduced from 200ms to 100ms
  }
  
  const handlePreviousQuestion = () => {
    if (isTransitioning || currentQuestionIndex === 0) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedOption(answers[currentQuestionIndex - 1] !== undefined ? answers[currentQuestionIndex - 1] : null)
      setIsTransitioning(false)
    }, 100) // Reduced from 200ms to 100ms
  }
  
  const toggleAutoAdvance = () => {
    setAutoAdvance(!autoAdvance)
  }
  
  const returnToHome = () => {
    setShowConfirmDialog(false)
    navigate('/')
  }
  
  const continueQuiz = () => {
    setShowConfirmDialog(false)
  }

  // Get color based on difficulty level
  const getLevelColor = (level: QuizLevel) => {
    switch(level) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      case 'mixed': return '#8a34ef';
      default: return '#4a6cff';
    }
  }
  
  const isOptionSelected = (index: number) => {
    return selectedOption === index
  }
  
  const isCorrectOption = (index: number) => {
    return index === currentQuestion.correctAnswer && selectedOption === index
  }
  
  const isIncorrectOption = (index: number) => {
    return selectedOption === index && index !== currentQuestion.correctAnswer
  }
  
  const getOptionState = (index: number) => {
    if (isCorrectOption(index)) return "correct"
    if (isIncorrectOption(index)) return "incorrect"
    if (isOptionSelected(index)) return "selected"
    return "visible"
  }
  
  return (
    <>
      {/* Simple background */}
      <SimpleBackground />
      
      {/* Back button - fixed to upper left side of screen */}
      {currentQuestionIndex > 0 && (
        <motion.button
          className="back-button"
          onClick={handlePreviousQuestion}
          disabled={isTransitioning || currentQuestionIndex === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 50,
            background: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            borderRadius: '12px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
          }}
        >
          <span style={{ marginRight: '6px', fontSize: '1.2rem' }}>←</span>
          <span>Back</span>
        </motion.button>
      )}
      
      {/* Home button - fixed to upper right side of screen */}
      <motion.button
        onClick={() => answers.some(a => a !== null) ? setShowConfirmDialog(true) : navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 50,
          background: 'rgba(0, 0, 0, 0.5)',
          border: 'none',
          borderRadius: '12px',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '1rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
        }}
      >
        <span style={{ marginRight: '6px', fontSize: '1.2rem' }}>🏠</span>
        <span>Home</span>
      </motion.button>
      
      <div className="page">
        <motion.div 
          className="card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            overflow: 'hidden', 
            maxHeight: '85vh', 
            zIndex: 10,
            maxWidth: '600px',
            width: '90%',
            position: 'relative'
          }}
        >
          {/* Difficulty level indicator */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              padding: '4px 8px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              backgroundColor: `${getLevelColor(quizLevel)}22`,
              color: getLevelColor(quizLevel),
              textTransform: 'capitalize',
              zIndex: 20
            }}
          >
            {quizLevel}
          </div>
          
          {/* Progress bar */}
          <div 
            style={{ 
              height: '5px', 
              background: `linear-gradient(90deg, ${getLevelColor(quizLevel)}, ${getLevelColor(quizLevel)}dd)`,
              width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
            }}
          />
          
          <div style={{ padding: '15px', paddingTop: '50px' }}>
            {/* Question counter */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                {currentQuestionIndex + 1}/{quizQuestions.length}
              </span>
              <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                Score: {score}
              </span>
            </div>
            
            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }} // Reduced from 0.3 to 0.15
              >
                <h2 
                  style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 600,
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}
                >
                  {currentQuestion.question}
                </h2>
                
                {/* Options - Grid Layout */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginBottom: '15px'
                }}>
                  {currentQuestion.options.map((option, index) => {
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const isSelected = selectedOption === index;
                    const wasAnswered = answered[currentQuestionIndex];
                    let className = "option-button";
                    
                    return (
                      <motion.button
                        key={index}
                        className={className}
                        onClick={() => handleOptionSelect(index)}
                        disabled={wasAnswered || isTransitioning}
                        custom={index}
                        variants={optionVariants}
                        initial="hidden"
                        animate={getOptionState(index)}
                        whileHover={!wasAnswered ? { scale: 1.03 } : {}}
                        style={{
                          minHeight: '50px',
                          display: 'flex',
                          alignItems: 'center',
                          position: 'relative'
                        }}
                      >
                        <div className="option-letter">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div style={{ flex: 1, paddingLeft: '8px' }}>
                          {option}
                        </div>
                        
                        {/* Show indicators for selected option */}
                        {isSelected && wasAnswered && (
                          <motion.div 
                            style={{
                              position: 'absolute',
                              right: '10px',
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: isCorrect ? '#4CAF50' : '#F44336',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            {isCorrect ? '✓' : '✕'}
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Next button (only shown when option is selected and auto-advance is off) */}
            {selectedOption !== null && !autoAdvance && (
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <motion.button 
                  className="button" 
                  onClick={handleNextQuestion}
                  disabled={isTransitioning}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ padding: '8px 20px' }}
                >
                  Next Question
                </motion.button>
              </div>
            )}
            
            {/* Auto-advance toggle */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '10px 0',
                fontSize: '0.9rem',
                opacity: 0.7
              }}
            >
              <label>
                <input 
                  type="checkbox" 
                  checked={autoAdvance} 
                  onChange={toggleAutoAdvance}
                  style={{ marginRight: '5px' }}
                />
                Auto-advance when option selected
              </label>
            </div>
            
            {/* Skip button */}
            <button 
              className="skip-button" 
              onClick={handleSkipQuestion}
              disabled={isTransitioning}
            >
              Skip &rarr;
            </button>
            
            {/* Keyboard shortcuts hint */}
            <div 
              style={{
                fontSize: '0.8rem',
                opacity: 0.5,
                textAlign: 'center',
                marginTop: '10px'
              }}
            >
              Keyboard: 1-4 for options, ←→ to navigate, Esc for home
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Confirmation dialog */}
      {showConfirmDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100
        }}>
          <motion.div 
            className="card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ 
              padding: '20px', 
              maxWidth: '400px',
              textAlign: 'center'
            }}
          >
            <h3 style={{ marginBottom: '15px' }}>Are you sure?</h3>
            <p>Your progress will be lost if you leave the quiz.</p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: '20px' 
            }}>
              <button 
                className="button" 
                onClick={continueQuiz}
                style={{ 
                  backgroundColor: '#4a6cff',
                  marginRight: '10px',
                  padding: '8px 15px'
                }}
              >
                Continue Quiz
              </button>
              <button 
                className="button" 
                onClick={returnToHome}
                style={{ 
                  backgroundColor: '#F44336',
                  padding: '8px 15px'
                }}
              >
                Leave Quiz
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Quiz 