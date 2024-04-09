import * as S from './styles'

const SelectorTension = ({ index, lineProperties, updateLayer }: any) => {
  return (
    <S.SelectorTension>
      <S.SelectorTensionText>Tension</S.SelectorTensionText>

      <S.SelectorTensionInput
        defaultValue="0"
        max={100}
        min={0}
        name="tension"
        type="range"
        onChange={(e) => updateLayer(index, { lineProperties: {
          ...lineProperties,
          tension: parseInt(e.target.value, 10) / 100
        }})}
      />
    </S.SelectorTension>
  )
}

export default SelectorTension
