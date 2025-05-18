import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { QuizLevel } from '../data/quizData'

// Simple background instead of lazy-loaded 3D
const SimpleBackground = () => (
  <div style={{ 
    position: 'fixed', 
    top: 0, left: 0, 
    width: '100%', 
    height: '100%',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #0f1722 0%, #1a1f29 100%)' 
  }}>
    <div className="bg-shapes">
      <div className="circle c1"></div>
      <div className="circle c2"></div>
      <div className="circle c3"></div>
    </div>
  </div>
)

const Home = () => {
  const navigate = useNavigate()
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<QuizLevel | null>(null)
  const [showOptions, setShowOptions] = useState(true)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  
  const startQuiz = () => {
    if (selectedLevel) {
      // Hide options with animation before navigation
      setShowOptions(false)
      setTimeout(() => {
        navigate('/quiz', { state: { level: selectedLevel } })
      }, 500)
    }
  }
  
  const selectLevel = (level: QuizLevel) => {
    setSelectedLevel(level)
  }
  
  const handleExit = () => {
    setShowExitConfirm(true)
  }
  
  const confirmExit = () => {
    // This will close the window if the app is running in a browser
    window.close()
    
    // For desktop apps using Electron or similar frameworks,
    
    setTimeout(() => {
      setShowExitConfirm(false)
      alert('Please close the window manually if it did not close automatically.')
    }, 1000)
  }
  
  const cancelExit = () => {
    setShowExitConfirm(false)
  }
  
  const getLevelColor = (level: QuizLevel) => {
    switch(level) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      case 'mixed': return '#8a34ef';
      default: return '#4a6cff';
    }
  }

  return (
    <>
      <SimpleBackground />
      
      {/* Exit Button */}
      <motion.button
        onClick={handleExit}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, rotate: 180 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 100,
          background: 'rgba(255, 50, 50, 0.8)',
          color: 'white',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}
      >
        ✕
      </motion.button>
      
      <div className="page">
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            maxWidth: '600px',
            width: '90%'
          }}
        >
          <h1
            className="gradient-text"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: 700,
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}
          >
            3D Quiz App
          </h1>
          
          <p
            style={{
              fontSize: '1.2rem',
              opacity: 0.8,
              marginBottom: '2rem',
              textAlign: 'center',
              lineHeight: 1.6
            }}
          >
            Test your knowledge with this interactive quiz! Choose a difficulty level to begin.
          </p>
          
          {/* Level Selection */}
          <AnimatePresence>
            {showOptions && (
              <motion.div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '2rem'
                }}
              >
                {(['easy', 'medium', 'hard', 'mixed'] as QuizLevel[]).map((level, index) => (
                  <motion.button
                    key={level}
                    className="level-button"
                    onClick={() => selectLevel(level)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.1, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ 
                      padding: '15px 25px',
                      borderRadius: '12px',
                      backgroundColor: selectedLevel === level ? `${getLevelColor(level)}22` : 'rgba(255, 255, 255, 0.05)',
                      border: `2px solid ${selectedLevel === level ? getLevelColor(level) : 'rgba(255, 255, 255, 0.1)'}`,
                      color: selectedLevel === level ? getLevelColor(level) : 'white',
                      fontWeight: selectedLevel === level ? 600 : 400,
                      fontSize: '1.1rem',
                      textTransform: 'capitalize',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {selectedLevel === level && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        ✓
                      </motion.span>
                    )}
                    {level}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Start Button */}
          <AnimatePresence>
            {selectedLevel && showOptions && (
              <motion.div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: '1rem'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  className="button"
                  onClick={startQuiz}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  style={{ 
                    fontSize: '1.2rem',
                    padding: '15px 40px',
                    background: `linear-gradient(90deg, ${getLevelColor(selectedLevel)}, ${getLevelColor(selectedLevel)}dd)`
                  }}
                >
                  Start Quiz
                  <motion.span
                    style={{
                      display: 'inline-block',
                      marginLeft: '8px'
                    }}
                    animate={{ x: isButtonHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
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
          zIndex: 200
        }}>
          <motion.div 
            className="card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ 
              padding: '20px 30px', 
              maxWidth: '400px',
              textAlign: 'center'
            }}
          >
            <h3 style={{ marginBottom: '15px', fontSize: '1.5rem' }}>Exit Application?</h3>
            <p style={{ marginBottom: '20px' }}>Are you sure you want to exit the quiz application?</p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              gap: '15px'
            }}>
              <motion.button 
                className="button" 
                onClick={cancelExit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  flex: 1,
                  padding: '10px 15px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                Cancel
              </motion.button>
              <motion.button 
                className="button" 
                onClick={confirmExit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  flex: 1,
                  padding: '10px 15px',
                  background: 'rgba(255, 50, 50, 0.8)'
                }}
              >
                Exit
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Home 