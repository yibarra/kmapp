import type { PointTypePosition } from '../LayersProvider/interfaces'

// get distance hypot
export const getDistance = (p1: number[], p2: number[]) => {
  return Math.hypot(p1[0] - p2[0], p1[1] - p2[1])
}

// calculate dash array
export const calculateDashArray = (distance: number, dashSize = 10) => {
  const dashCount = Math.floor(distance / dashSize)

  return Array(dashCount).fill(dashSize)
}

// get distance
export const getDistanceBetweenPoints = (p1: number[], p2: number[]) => {
  return Math.sqrt(
    Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2)
  )
}

// get set position
export const getNearestPosition = (pos: number[], points: PointTypePosition[], threshold = Number.MAX_SAFE_INTEGER) => {
  let nearest = null
  let minDist = Number.MAX_SAFE_INTEGER
  
  for (const point of points) {
    const dist = getDistance(pos, [point.x, point.y])

    console.info(dist, pos[0], point.x, minDist)

    if (dist < minDist && dist < threshold) {
      minDist = dist
      nearest = point
    }
  }

  console.info(nearest)

  return nearest
}