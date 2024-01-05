import { useEffect, useState } from 'react'

// Hook
function UseWindowSize() {
  const [windowSize, setWindowSize]: any = useState({
    width: undefined,
    height: undefined,
  });

  // use effect
  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
};

export default UseWindowSize