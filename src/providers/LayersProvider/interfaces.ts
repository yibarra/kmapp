import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'

export type CurveType = {
  curve: number[]
  pointEnd: number
  pointInit: number
}

export type PointTypePosition = {
  x: number
  y: number
  position: number
}

export interface LayerLineProperties {
  dash?: number[]
  lineCap: 'butt' | 'round' | 'square'
  lineJoin: 'miter' | 'round' | 'bevel'
  stroke: string
  strokeWidth: number
  tension: number
}

export interface LayerPointsProperties extends Omit<LayerLineProperties, 'tension'> {
  fill?: string
  radius: number
}

export interface LayerProps {
  curves: CurveType[]
  drag: {
    offset: number[]
  }
  id: number
  name: string
  currentPoint: number
  lineProperties: LayerLineProperties,
  pointsProperties: LayerPointsProperties,
  points: PointTypePosition[]
}

export interface LayersContextProps {
  createLayer(layer: LayerProps): void
  createLayerCurve(pointInit: PointTypePosition, pointEnd: PointTypePosition): void
  createLayerPoint(index: number, point: PointTypePosition): void | boolean
  current: number | null
  deleteLayer(index: number): void
  layers: LayerProps[]
  deleteLayerPoint(index: number): void
  setCurrent: Dispatch<SetStateAction<number | null>>
  updateLayer(index: number, data: LayerProps): void
  updateLayerCurvePoint(index: number, init: number, end: number, curve: number[]): void
  updateLayerPoint(point: PointTypePosition, index: number): void
}

export interface LayersProvidersProps extends PropsWithChildren {
  data: {
    layers: LayerProps[]
  },
  enable: boolean
  remove: boolean
}
