import { useContext } from 'react'
import Stage from './Stage'

import Controls from '../../components/Controls/Controls'
import MenuPoint from '../../components/MenuPoint'
import { DataContext } from '../../providers/DataProvider'
import { LayersProvider } from '../../providers/LayersProvider'
import { MainContext } from '../../providers/MainProvider/MainProvider'
import { UIContext } from '../../providers/UIProvider/UIProvider'
import UseWindowSize from '../../hooks/useWindowSize'
import type { LayersProvidersProps } from '../../providers/LayersProvider/interfaces'
import * as S from './styles'

// main
const Main = () => {
  const size = UseWindowSize()

  const { loaded } = useContext(MainContext)
  const { enable, remove } = useContext(UIContext)
  const { data } = useContext(DataContext)

  const values = data as LayersProvidersProps['data']['layers']

  // render
  return (
    <S.MainSection tabIndex={0}>
      {loaded === true && (
        <LayersProvider data={{ layers: values }} enable={enable} remove={remove}>
          <Stage {...size} />

          <MenuPoint />

          <Controls.Root>
            <Controls.Main />
            <Controls.Layers />
          </Controls.Root>
        </LayersProvider>
      )}
    </S.MainSection>
  );
};

export default Main