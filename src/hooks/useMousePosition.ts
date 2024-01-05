import { useState, useEffect } from 'react'

// Hook
function UseMousePosition() {
  const [mousePosition, setMousePosition] = useState<{x: number, y: number}>({ x: 0, y: 0 });

  // update mouse position
  const updateMousePosition = (ev: MouseEvent) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY })
  }

  // use effect
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    
    window.addEventListener('mousemove', updateMousePosition)

    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return mousePosition
}

export default UseMousePosition
