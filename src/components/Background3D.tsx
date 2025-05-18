import React from 'react'

// Super lightweight background - no 3D to maximize loading speed
const Background3D = () => {
  return (
    <div className="canvas-container" style={{
      background: 'linear-gradient(135deg, #0f1722 0%, #1a1f29 100%)'
    }}>
      <div className="bg-shapes">
        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <div className="circle c3"></div>
      </div>
    </div>
  )
}

export default Background3D 