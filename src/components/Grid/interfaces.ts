export type AxisType = [number, number, number, number, number] // x, y, size, x original, y original

export interface GridProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createGridBoxes: any
  height: number
  width: number
}
