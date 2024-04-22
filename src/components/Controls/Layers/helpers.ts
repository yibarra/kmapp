import type { LayerProps } from '../../../providers/LayersProvider/interfaces'

// width height by points
export const getWidthHeightByPoints = (points: LayerProps['points']) => {
  if (!Array.isArray(points) || !points.length) {
    return {
      height: 0,
      width: 0
    }
  }

  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  points.forEach((point) => {
    minX = Math.min(minX, point.x)
    maxX = Math.max(maxX, point.x)
    minY = Math.min(minY, point.y)
    maxY = Math.max(maxY, point.y)
  })
  
  return {
    height: maxY - minY,
    width: maxX - minX,
  }
}