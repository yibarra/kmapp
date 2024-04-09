export interface SelectorDashProps {
  properties: {
    dash: number[]
  }
  updateDashProperty(props: { dash: number[] }, value: number[]): void
}
