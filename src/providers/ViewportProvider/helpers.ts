// bound func
export const boundFunc = (pos: number[], scale: number, height: number, width: number) => {
  const x = Math.min(0, Math.max(pos[0], width * (1 - scale)));
  const y = Math.min(0, Math.max(pos[1], height * (1 - scale)));

  return [x, y]
}
