// get nearest point
export const getNearestPoint = (loc: number[], points: number[][], threshold = Number.MAX_SAFE_INTEGER) => {
  let minDist = Number.MAX_SAFE_INTEGER
  let nearest = null

  for (const point of points) {
     const dist = distance(point, loc)

     if (dist < minDist && dist < threshold) {
        minDist = dist
        nearest = point
     }
  }

  return nearest
}

// distance
export const distance = (p1: number[], p2: number[]) => (
  Math.hypot(p1[0] - p2[0], p1[1] - p2[1])
)

// add
export const add = (p1: number[], p2: number[]): number[] => (
  [p1[0] + p2[0], p1[1] + p2[1]]
)

// subtract
export const subtract =(p1: number[], p2: number[]): number[] => (
  [p1[0] - p2[0], p1[1] - p2[1]]
)

// scale
export const scale =(p: number[], scaler: number): number[] => (
  [p[0] * scaler, p[1] * scaler]
)