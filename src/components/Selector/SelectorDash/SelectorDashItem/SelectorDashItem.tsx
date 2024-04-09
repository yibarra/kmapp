import type { SelectorDashItemProps } from './interfaces'
import * as S from './styles'

// selector dash item
const SelectorDashItem = ({
  max,
  min,
  onChangeDash,
  type = 'default',
  value,
}: SelectorDashItemProps) => (
  <S.SelectorDashItemP>
    <S.SelectorDashInput
      min={min}
      max={max}
      onChange={(event) => {
        if (typeof onChangeDash === 'function') {
          onChangeDash(Number(event.currentTarget.value), type)
        }
      }}
      type="number"
      value={value}
    />
  </S.SelectorDashItemP>
)

export default SelectorDashItem
