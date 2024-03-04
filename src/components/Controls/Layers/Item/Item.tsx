import SelectorColor from '../../../Selector/SelectorColor'
import SelectorDash from '../../../Selector/SelectorDash'
import SelectorLineType from '../../../Selector/SelectorLineType'
import SelectorSize from '../../../Selector/SelectorSize'
import * as S from './styles'

// controls layers item
const Item = ({
  current,
  deleteLayer,
  index,
  layer,
  setCurrent,
  updateLayer,
}: any) => {

  const updateLineDashProperties = (properties: any, dash: number[]) => {
    updateLayer(index, { lineProperties: {
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

  const updateLayerLineCapProperties = (lineCap: string) => {
    updateLayer(index, { lineProperties: {
      ...layer.lineProperties,
      lineCap,
    }})
  }

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

  // render
  return (
    <S.ControlsLayersItemDiv style={{ border: current ? '1px solid red' : '', overflow: current ? 'initial' : 'hidden' }}>
      <S.ControlsLayersItemHeaderDiv>
        <input
          type="text"
          defaultValue={layer.name}
          onChange={(e) => updateLayer(index, { name: e.currentTarget.value })}
        />

        <button>
          <span className="material-symbols-rounded" data-any="_off">
            visibility
          </span>
        </button>

        <button
          onClick={() => deleteLayer(index)}
        >
          <span className="material-symbols-rounded">
            delete_forever
          </span>
        </button>

        <button onClick={() => setCurrent(index)}>
          active
        </button>
      </S.ControlsLayersItemHeaderDiv>

      <S.ControlsLayersItemContainer toggle={current ? 'true' : 'false'}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 5, justifyContent: 'flex-start' }}>
          <SelectorSize
            strokeColor={layer.lineProperties.stroke}
            onChangeValue={updateLayerSizeLineProperties}
            value={layer.lineProperties.strokeWidth}
          />

          <SelectorColor
            color={layer.lineProperties.stroke}
            setColor={(stroke: string) => updateLayer(index, { lineProperties: {
              ...layer.lineProperties,
              stroke,
            }})}
            variation="line"
          />

          <SelectorDash
            index={index}
            properties={layer.lineProperties}
            updateDashProperty={updateLineDashProperties}
          />

          <SelectorLineType
            onChangeValue={updateLayerLineCapProperties}
            items={[{ name: 'round' }, { name: 'butt' }, { name: 'square' }]}
            variant="cap"
          />

          <SelectorLineType
            onChangeValue={updateLayerLineJoinProperties}
            items={[{ name: 'miter' }, { name: 'round'}, { name: 'bevel' }]}
          />

          <div>
            <p>tension</p>
            <input
              name="tension"
              type="range"
              min={0}
              max={100}
              defaultValue="0"
              onChange={(e) => updateLayer(index, { lineProperties: {
                ...layer.lineProperties,
                tension: parseInt(e.target.value, 10) / 100
              }})}
            />
          </div>
        </div>

        <div style={{ display: 'inline-flex', gap: 5, alignItems: 'stretch', justifyContent: 'flex-start' }}>
          <SelectorSize
            fill={layer.pointsProperties.fill}
            onChangeValue={updateLayerSizePointsProperties}
            value={layer.pointsProperties.radius}
            variant="block"
          />

          <SelectorSize
            fill={layer.pointsProperties.fill}
            onChangeValue={updateLayerStrokeWidthPointsProperties}
            value={layer.pointsProperties.strokeWidth}
            variant="border"
          />

          <SelectorColor
            color={layer.pointsProperties.stroke}
            radius
            setColor={(stroke: string) => updateLayer(index, { pointsProperties: {
              ...layer.pointsProperties,
              stroke,
            }})}
            variation="border"
          />

          <SelectorColor
            color={layer.pointsProperties.fill}
            radius
            setColor={(fill: string) => updateLayer(index, { pointsProperties: {
              ...layer.pointsProperties,
              fill,
            }})}
          />
        </div>
      </S.ControlsLayersItemContainer>
    </S.ControlsLayersItemDiv>
  )
}

export default Item
