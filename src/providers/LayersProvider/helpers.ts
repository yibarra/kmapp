import type { CurveType, PointTypePosition } from './interfaces'

// get point by position
export const getPointByPosition = (
  points: PointTypePosition[],
  position: number
): PointTypePosition => {
  return points.filter((point: PointTypePosition) => point.position === position)[0]
}

// get curve exist
export const getCurveExist = (curves: CurveType[], pointCurve: number): boolean => {
  if (!Array.isArray(curves) || !curves.length) {
    return false
  }

  return curves.filter((curve) => curve.curve === pointCurve || curve.pointInit === pointCurve || curve.pointEnd === pointCurve).length > 0
}

// get point exist in curve
export const getPointExistInCurve = (curves: CurveType[], position: number): boolean | CurveType[] => {
  if (!Array.isArray(curves) || !curves.length) {
    return false
  }

  const pointCurve = curves.filter(
    (curve: CurveType) => curve.pointInit === position || curve.pointEnd === position
  )

  return pointCurve
}

// order points
export const orderPoints = (points: PointTypePosition[], index: number) => {
  if (!points) {
    return []
  }

  const pointsOrder = []

  for (let i = 0; i < points.length; i++) {
    const item = points[i]
    
    if (index > item?.position) {
      pointsOrder.push(item)
    } else {
      const itemUpdate = {
        ...item,
        position: Number(item?.position) + 1,
      }

      pointsOrder.push(itemUpdate)
    }
  }

  return pointsOrder
}

// remove and reorder
export const removeAndReorder = (items: PointTypePosition[], indexToRemove: number): PointTypePosition[] => {
  const updatedItems = items.filter((_, index) => index !== indexToRemove)
  
  const sortedItems = updatedItems.map((item, index) => ({
    ...item,
    position: index
  }))
  
  return sortedItems
}
