import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Background3D from '../components/Background3D'
import { useEffect, useState } from 'react'

const Results = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [animateScore, setAnimateScore] = useState(0)
  const [animatePercentage, setAnimatePercentage] = useState(0)
  
  const score = location.state?.score || 0
  const totalQuestions = location.state?.totalQuestions || 10
  const answers = location.state?.answers || []
  
  const percentage = Math.round((score / totalQuestions) * 100)
  
  // Get color based on score percentage
  const getScoreColor = () => {
    if (percentage >= 80) return '#4CAF50'; // Green for excellent
    if (percentage >= 50) return '#FFC107'; // Yellow/amber for good
    return '#F44336'; // Red for needs improvement
  }
  
  const getScoreMessage = () => {
    if (percentage >= 80) return 'Excellent work!';
    if (percentage >= 50) return 'Good job!';
    return 'You can do better!';
  }
  
  useEffect(() => {
    // Animate score counting up
    const scoreInterval = setInterval(() => {
      setAnimateScore((prev) => {
        if (prev < score) return prev + 1;
        clearInterval(scoreInterval);
        return score;
      });
    }, 100);
    
    // Animate percentage circle filling
    const percentInterval = setInterval(() => {
      setAnimatePercentage((prev) => {
        if (prev < percentage) return prev + 1;
        clearInterval(percentInterval);
        return percentage;
      });
    }, 20);
    
    return () => {
      clearInterval(scoreInterval);
      clearInterval(percentInterval);
    };
  }, [score, percentage]);
  
  return (
    <>
      <Background3D />
      <motion.div 
        className="page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="card"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ padding: '40px' }}
        >
          <motion.h1
            className="gradient-text"
            style={{
              fontSize: '3rem',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: '20px'
            }}
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            Quiz Results
          </motion.h1>
          
          {/* Score Circle */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginBottom: '30px',
            position: 'relative',
            height: '200px'
          }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              {/* Background circle */}
              <circle 
                cx="100" 
                cy="100" 
                r="80" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.1)" 
                strokeWidth="12"
              />
              {/* Animated progress circle */}
              <motion.circle 
                cx="100" 
                cy="100" 
                r="80"
                fill="none" 
                stroke={getScoreColor()}
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animatePercentage / 100 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                  transformOrigin: 'center',
                  transform: 'rotate(-90deg)'
                }}
              />
            </svg>
            
            {/* Score Text */}
            <div style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}>
              <motion.div
                style={{
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  color: getScoreColor(),
                  lineHeight: 1
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {animateScore}
              </motion.div>
              <motion.div
                style={{
                  fontSize: '1.2rem',
                  opacity: 0.8
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                out of {totalQuestions}
              </motion.div>
              <motion.div
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  marginTop: '5px',
                  color: getScoreColor()
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {animatePercentage}%
              </motion.div>
            </div>
          </div>
          
          <motion.div
            style={{
              textAlign: 'center',
              marginBottom: '30px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h2 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '10px',
              color: getScoreColor()
            }}>
              {getScoreMessage()}
            </h2>
          </motion.div>
          
          <motion.div
            style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center'
            }}
          >
            <motion.button
              className="button"
              onClick={() => navigate('/quiz', { 
                state: { level: location.state?.level || 'easy' } 
              })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: '1.1rem' }}
            >
              Retry Quiz
            </motion.button>
            
            <motion.button
              className="button"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                fontSize: '1.1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              Home
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Results 