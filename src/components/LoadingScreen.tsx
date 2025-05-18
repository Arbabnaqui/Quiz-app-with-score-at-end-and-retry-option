import React from 'react'

// Ultra minimal loading screen for fastest possible load time
const LoadingScreen = () => {
  return (
    <div className="page" style={{ background: 'var(--bg-color)' }}>
      <div style={{
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 className="gradient-text" style={{ fontSize: '1.8rem' }}>
          Loading...
        </h1>
      </div>
    </div>
  )
}

export default LoadingScreen 