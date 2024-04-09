export interface SelectorDashItemProps {
  min: number
  max: number
  onChangeDash(value: number, type: string): void
  type: string
  value: number
}
