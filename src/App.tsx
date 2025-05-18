import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'))
const Quiz = lazy(() => import('./pages/Quiz'))
const Results = lazy(() => import('./pages/Results'))

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}

export default App 