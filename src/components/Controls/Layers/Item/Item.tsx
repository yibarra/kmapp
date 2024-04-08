import SelectorColor from '../../../Selector/SelectorColor'
import SelectorDash from '../../../Selector/SelectorDash'
import SelectorLineType from '../../../Selector/SelectorLineType'
import SelectorSize from '../../../Selector/SelectorSize'
import * as S from './styles'

// controls layers item
const Item = ({
  active,
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
    <S.ControlsLayersItemDiv style={{ overflow: active ? 'initial' : 'hidden' }}>
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

        <button onClick={() => setCurrent(active ? null : index)}>
          active
        </button>
      </S.ControlsLayersItemHeaderDiv>

      <S.ControlsLayersItemContainer toggle={active ? 'true' : 'false'}>
        <S.ControlsLayerProperties>
          <S.ControlsLayerPropertiesTitle>line properties</S.ControlsLayerPropertiesTitle>

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
            strokeColor={layer.lineProperties.stroke}
            onChangeValue={updateLayerSizeLineProperties}
            value={layer.lineProperties.strokeWidth}
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
        </S.ControlsLayerProperties>

        <S.ControlsLayerProperties>
          <S.ControlsLayerPropertiesTitle>points properties</S.ControlsLayerPropertiesTitle>
          
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
            color={layer.pointsProperties.stroke}
            radius
            setColor={(stroke: string) => updateLayer(index, { pointsProperties: {
              ...layer.pointsProperties,
              stroke,
            }})}
            text="Border Color"
            variation="border"
          />

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
        </S.ControlsLayerProperties>
      </S.ControlsLayersItemContainer>
    </S.ControlsLayersItemDiv>
  )
}

export default Item
