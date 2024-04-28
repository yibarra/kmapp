import { useCallback, useContext, useEffect } from 'react'
import SelectorColor from '../../../Selector/SelectorColor'
import SelectorDash from '../../../Selector/SelectorDash'
import SelectorLineType from '../../../Selector/SelectorLineType'
import SelectorSize from '../../../Selector/SelectorSize'
import SelectorTension from '../../../Selector/SelectorTension'
import { UIContext } from '../../../../providers/UIProvider/UIProvider'
import * as S from './styles'
import { getWidthHeightByPoints } from '../helpers'

// controls layers item
const Item = ({
  active,
  deleteLayer,
  index,
  layer,
  enable = false,
  setCurrent,
  setEnable,
  updateLayer,
}: any) => {
  // is move
  const { isMove, setIsMove } = useContext(UIContext)

  // move offset
  const setMoveOffset = () => setIsMove((val) => !val)
  
  const updateLineDashProperties = (properties: any, dash: number[]) => {
    updateLayer(index, { lineProperties: {
      ...properties,
      dash,
    }})
  }

  const updateLineDashPropertiesPoints = (properties: any, dash: number[]) => {
    updateLayer(index, { pointsProperties: {
      ...properties,
      dash,
    }})
  }

  const updateLayerLineJoinProperties = (lineJoin: string) => {
    updateLayer(index, { lineProperties: {
      ...layer.lineProperties,
      lineJoin,
    }})
  }

  const updateLayerLineCapProperties = useCallback((lineCap: string) => {    
    updateLayer(index, { lineProperties: {
      ...layer.lineProperties,
      lineCap,
    }})
  }, [layer.lineProperties, index, updateLayer])

  const updateLayerLineJoinPropertiesPoints = (lineJoin: string) => {
    updateLayer(index, { pointsProperties: {
      ...layer.pointsProperties,
      lineJoin,
    }})
  }

  const updateLayerLineCapPropertiesPoints = useCallback((lineCap: string) => {
    updateLayer(index, { pointsProperties: {
      ...layer.pointsProperties,
      lineCap,
    }})
  }, [layer.pointsProperties, index, updateLayer])

  const updateLayerSizeLineProperties = (strokeWidth: number) => {
    updateLayer(index, { lineProperties: {
      ...layer.lineProperties,
      strokeWidth,
    }})
  }

  const updateLayerStrokeWidthPointsProperties = (strokeWidth: number) => {
    updateLayer(index, { pointsProperties: {
      ...layer.pointsProperties,
      strokeWidth,
    }})
  }

  const updateLayerSizePointsProperties = (radius: number) => {
    updateLayer(index, { pointsProperties: {
      ...layer.pointsProperties,
      radius,
    }})
  }

  // use effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (active && isMove) {
        if (event?.shiftKey) {
          const { height, width } = getWidthHeightByPoints(layer.points)
          console.info(height, width)

          const posX = event.clientX - (window.innerWidth / 2)
          const posY = event.clientY - (window.innerHeight / 2)

          updateLayer(index, { drag: {
            ...layer.drag,
            offset: [posX, posY],
          }})
        }
      }
    }

    if (active && isMove) {
      window.addEventListener('mousemove', handleMouseMove)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [active, index, isMove, layer, updateLayer])

  // render
  return (
    <S.ControlsLayersItemDiv style={{ overflow: active ? 'initial' : 'hidden' }}>
      <S.ControlsLayersItemHeaderDiv>
        <input
          defaultValue={layer.name}
          onChange={(e) => updateLayer(index, { name: e.currentTarget.value })}
          onClick={() => setCurrent(index)}
          type="text"
        />

        <button onClick={() => setMoveOffset()} style={{ background: isMove && active ? 'lightBlue' : 'white' }}>
          <span className="material-symbols-rounded">
            back_hand
          </span>
        </button>

        <button onClick={() => setEnable(!enable)} style={{ background: enable && active ? 'red' : 'white' }}>
          <span className="material-symbols-rounded">
            edit
          </span>
        </button>

        <button
          onClick={() => deleteLayer(index)}
        >
          <span className="material-symbols-rounded">
            delete_forever
          </span>
        </button>
      </S.ControlsLayersItemHeaderDiv>

      <S.ControlsLayersItemContainer toggle={active ? 'true' : 'false'}>
        <S.ControlsLayerProperties>
          <S.ControlsLayerPropertiesTitle>line properties</S.ControlsLayerPropertiesTitle>

          <S.ControlsLayerGroup>
            <SelectorColor
              color={layer.lineProperties.stroke}
              setColor={(stroke: string) => updateLayer(index, { lineProperties: {
                ...layer.lineProperties,
                stroke,
              }})}
              text="Color"
              variation="line"
            />

            <SelectorSize
              onChangeValue={updateLayerSizeLineProperties}
              value={layer.lineProperties.strokeWidth}
            />

            <SelectorDash
              properties={layer.lineProperties}
              updateDashProperty={updateLineDashProperties}
            />
          </S.ControlsLayerGroup>

          <S.ControlsLayerGroup>
            <SelectorLineType
              onChangeValue={updateLayerLineCapProperties}
              items={[{ name: 'round' }, { name: 'butt' }, { name: 'square' }]}
              title="Line Join"
              variant="cap"
            />

            <SelectorLineType
              items={[{ name: 'miter' }, { name: 'round'}, { name: 'bevel' }]}
              onChangeValue={updateLayerLineJoinProperties}
              title="Line Cap"
            />
          </S.ControlsLayerGroup>

          <SelectorTension
            index={index}
            lineProperties={layer.lineProperties}
            updateLayer={updateLayer}
          />
        </S.ControlsLayerProperties>

        <S.ControlsLayerProperties>
          <S.ControlsLayerPropertiesTitle>points properties</S.ControlsLayerPropertiesTitle>
          
          <S.ControlsLayerGroup>
            <SelectorColor
              color={layer.pointsProperties.fill}
              radius
              setColor={(fill: string) => updateLayer(index, { pointsProperties: {
                ...layer.pointsProperties,
                fill,
              }})}
              text="Color"
              variation="line"
            />

            <SelectorColor
              color={layer.pointsProperties.active}
              radius
              setColor={(active: string) => updateLayer(index, { pointsProperties: {
                ...layer.pointsProperties,
                active,
              }})}
              text="Active"
              variation="line"
            />

            <SelectorColor
              color={layer.pointsProperties.stroke}
              radius
              setColor={(stroke: string) => updateLayer(index, { pointsProperties: {
                ...layer.pointsProperties,
                stroke,
              }})}
              text="Border"
              variation="border"
            />
          </S.ControlsLayerGroup>

          <S.ControlsLayerGroup>
            <SelectorSize
              onChangeValue={updateLayerSizePointsProperties}
              text="Radius"
              value={layer.pointsProperties.radius}
              />

            <SelectorSize
              onChangeValue={updateLayerStrokeWidthPointsProperties}
              text="Border Size"
              value={layer.pointsProperties.strokeWidth}
            />

            <SelectorDash
              properties={layer.pointsProperties}
              updateDashProperty={updateLineDashPropertiesPoints}
            />
          </S.ControlsLayerGroup>

          <S.ControlsLayerGroup>
            <SelectorLineType
              onChangeValue={updateLayerLineCapPropertiesPoints}
              items={[{ name: 'round' }, { name: 'butt' }, { name: 'square' }]}
              title="Line Join"
              variant="cap"
            />

            <SelectorLineType
              items={[{ name: 'miter' }, { name: 'round'}, { name: 'bevel' }]}
              onChangeValue={updateLayerLineJoinPropertiesPoints}
              title="Line Cap"
            />
          </S.ControlsLayerGroup>
        </S.ControlsLayerProperties>
      </S.ControlsLayersItemContainer>
    </S.ControlsLayersItemDiv>
  )
}

export default Item
