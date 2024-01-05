import { createContext, useMemo } from 'react'
import type { PropsWithChildren } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ColorContext = createContext({} as any)

// color provider
const ColorProvider = ({
  children,
}: PropsWithChildren) => {
  // get random color
  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360)
    const color = `hsl(${hue}, 70%, 80%)`

    return color
  }

  return (
    <ColorContext.Provider
      value={useMemo(() => ({
        getRandomPastelColor,
      }), [])}
    >
      {children}
    </ColorContext.Provider>
  )
}

export { ColorContext, ColorProvider }
export default ColorProvider