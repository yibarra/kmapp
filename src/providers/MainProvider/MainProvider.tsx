import { createContext, useEffect, useState } from 'react'
import WebFontLoader from 'webfontloader'

import UseWindowSize from '../../hooks/useWindowSize'
import UIProvider from '../UIProvider/UIProvider'
import { DataProvider } from '../DataProvider'
import { dataLayers } from '../../components/Layers/data'
import type { MainContextProps, MainProviderProps } from './interfaces'

// main context
const MainContext = createContext({} as MainContextProps)

// main provider
const MainProvider = ({ children }: MainProviderProps) => {
  const [loaded, setLoaded] = useState(false)
  const viewport = UseWindowSize()

  // loading effects.
  useEffect(() => {
    // fetch necessary fonts.
    try {
      WebFontLoader.load({
        google: {
          families: [
            "Roboto Condensed:300,400,700",
            "Roboto Slab:300,400,500,600"
          ]
        }, fontactive: () => {
          setTimeout(() => setLoaded(true), 500)
        }
      })
    } catch (e: unknown) {
      console.error(`[ERROR FONT LOAD: ${e}]`)
    }
  }, [])
  
  // render
  return (
    <MainContext.Provider
      value={{
        loaded,
        viewport,
        setLoaded,
      }}
    >
      <UIProvider>
        <DataProvider name="kmapp.layers" data={dataLayers.layers}>
          {children}
        </DataProvider>
      </UIProvider>
    </MainContext.Provider>
  )
}

export { MainContext, MainProvider }
export default MainProvider