import React from 'react'
import ReactDOM from 'react-dom/client'

import MainProvider from './providers/MainProvider/MainProvider.tsx'
import ColorProvider from './providers/ColorProvider/ColorProvider.tsx'
import GridProvider from './providers/GridProvider/GridProvider.tsx'
import Main from './layout/Main/Main.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainProvider>
      <ColorProvider>
        <GridProvider>
          <Main />
        </GridProvider>
      </ColorProvider>
    </MainProvider>
  </React.StrictMode>,
)
