// get distance
export const getDistanceBetweenPoints = (point1: number[], point2: number[]) => {
  return Math.sqrt(
    Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2)
  )
}

// calculate dash array
export const calculateDashArray = (distance: number, dashSize = 10) => {
  const dashCount = Math.floor(distance / dashSize)

  return Array(dashCount).fill(dashSize)
}
