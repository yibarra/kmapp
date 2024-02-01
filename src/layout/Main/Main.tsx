import { useContext } from 'react'
import Stage from './Stage'

import UseWindowSize from '../../hooks/useWindowSize'
import { DataContext } from '../../providers/DataProvider'
import { LayersProvider } from '../../providers/LayersProvider'
import { MainContext } from '../../providers/MainProvider/MainProvider'
import { UIContext } from '../../providers/UIProvider/UIProvider'
import ViewportProvider from '../../providers/ViewportProvider/ViewportProvider'
import Controls from '../../components/Controls/Controls'
import type { MainContextProps } from '../../providers/MainProvider/interfaces'
import type { LayersProvidersProps } from '../../providers/LayersProvider/interfaces'
import * as S from './styles'

// main
const Main = () => {
  const size = UseWindowSize()

  const {
    loaded,
  } = useContext<MainContextProps>(MainContext)

  const { isDragging, enable, remove } = useContext(UIContext)
  const { data } = useContext(DataContext)

  const values = data as LayersProvidersProps['data']['layers']

  console.info(isDragging, 'yeah')

  // render
  return (
    <ViewportProvider height={size.height} width={size.width}>
      <S.MainSection tabIndex={0}>
        {loaded === true && size.height > 0 && size.width > 0 && (
          <LayersProvider data={{ layers: values }} enable={enable} remove={remove}>
            <Stage
              size={size}
            />

            <Controls.Layers />
          </LayersProvider>
        )}
      </S.MainSection>
    </ViewportProvider>
  );
};

export default Main