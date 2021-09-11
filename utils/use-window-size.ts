import { useEffect, useState } from 'react'

/**
 * React hook for getting window width and height
 * @returns - [width, height] browser window size
 */
function useWindowSize () {
  const [size, setSize] = useState<number[]>([0, 0])

  const updateSize = () => {
    setSize([window.innerWidth, window.innerHeight])
  }

  useEffect(() => {
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}

export default useWindowSize
