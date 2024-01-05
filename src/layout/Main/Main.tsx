import { useContext } from 'react'
import Stage from './Stage'

import UseWindowSize from '../../hooks/useWindowSize'
import { MainContext } from '../../providers/MainProvider/MainProvider'
import type { MainContextProps } from '../../providers/MainProvider/interfaces'
import { MainSection } from './styles'

// main
const Main = () => {
  const size = UseWindowSize()
  const {
    loaded,
  } = useContext<MainContextProps>(MainContext)

  // render
  return (
    <MainSection
      tabIndex={1}
    >
      {loaded === true && size.height > 0 && size.width > 0 &&
        <>
          <Stage
            size={size}
          />
        </>
      }
    </MainSection>
  );
};

export default Main