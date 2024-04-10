import SelectorColor from '../../../Selector/SelectorColor'
import SelectorDash from '../../../Selector/SelectorDash'
import SelectorLineType from '../../../Selector/SelectorLineType'
import SelectorSize from '../../../Selector/SelectorSize'
import SelectorTension from '../../../Selector/SelectorTension'
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

  const updateLayerLineCapProperties = (lineCap: string) => {
    updateLayer(index, { lineProperties: {
      ...layer.lineProperties,
      lineCap,
    }})
  }

  const updateLayerLineJoinPropertiesPoints = (lineJoin: string) => {
    updateLayer(index, { pointsProperties: {
      ...layer.pointsProperties,
      lineJoin,
    }})
  }

  const updateLayerLineCapPropertiesPoints = (lineCap: string) => {
    updateLayer(index, { pointsProperties: {
      ...layer.pointsProperties,
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
            onChangeValue={updateLayerSizeLineProperties}
            value={layer.lineProperties.strokeWidth}
          />

          <SelectorDash
            properties={layer.lineProperties}
            updateDashProperty={updateLineDashProperties}
          />

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

          <SelectorTension
            index={index}
            lineProperties={layer.lineProperties}
            updateLayer={updateLayer}
          />
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
        </S.ControlsLayerProperties>
      </S.ControlsLayersItemContainer>
    </S.ControlsLayersItemDiv>
  )
}

export default Item
