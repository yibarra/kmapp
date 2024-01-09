import { createContext, useCallback, useState } from 'react'

import { getCurveExist, getPointByPosition, getPointExistInCurve, orderPoints } from './LayersProviderTools'
import type { CurveType, LayerProps, LayersContextProps, LayersProvidersProps, PointTypePosition } from './interfaces'

// layers context
const LayersContext = createContext({} as LayersContextProps)

// layers provider
const LayersProvider = ({ children, data: dataInit, enable, remove }: LayersProvidersProps) => {
  const [current, setCurrent] = useState(0) // index current
  const [layers, setLayers] = useState<LayerProps[]>(dataInit.layers)

  // update layer
  const updateLayer = useCallback((index: number, data: LayerProps): void => {
    setLayers(prevLayers => {
      return prevLayers.map((layer, i) => {
        if (i === index) {
          return { ...layer, ...data }
        }

        return layer
      })
    })
  }, [setLayers])

  // create layer
  const createLayer = useCallback((layer: LayerProps) => {
    setLayers((oldLayers: LayerProps[]) => {
      return [
        ...oldLayers,
        layer
      ]
    })
  }, [setLayers])

  // create curve
  const createLayerCurve = useCallback((pointInit: PointTypePosition, pointEnd: PointTypePosition) => {
    if (!pointInit || !pointEnd) {
      return false
    }

    const curves: CurveType[] = layers[current].curves ?? []
    const checked = getCurveExist(curves, pointInit.position, pointEnd.position)

    if (!checked) {
      const curveX = (pointEnd.x + pointInit.x) / 2
      const curveY = (pointEnd.y + pointInit.y) / 2
  
      curves.push({
        pointInit: pointInit.position,
        pointEnd: pointEnd.position,
        curve: [curveX, curveY]
      })
  
      updateLayer(current, { ...layers[current], curves })
    }
  }, [current, layers, updateLayer])

  // update layer points
  const createLayerPoint = useCallback((index: number, point: PointTypePosition): void | boolean => {
    if (!enable) {
      return false
    }

    const layerSelected = layers[current]
    const points = orderPoints(layerSelected.points, index)

    if (points) {
      points.push(point)
  
      updateLayer(current, { ...layers[current], points, currentPoint: index })
    }
  }, [current, enable, layers, updateLayer])

  // delete layer
  const deleteLayer = useCallback((id: number) => {
    const resultLayers = [...layers]
    resultLayers.splice(resultLayers.findIndex((_, index) => index === id), 1)

    setCurrent((id - 1 < 0) ? 0 : id - 1)
    setLayers(resultLayers)
  }, [layers, setCurrent, setLayers])

  // remove layer point item
  const deleteLayerCurve = useCallback((index: number): CurveType[] => {
    const curves = []
    const curvesRemoves = getPointExistInCurve(layers[current].curves, index)

    if (Array.isArray(curvesRemoves)) {
      for (let j = 0; j < curvesRemoves.length; j++) {
        const curve = curvesRemoves[j]
        const indexCurve = layers[current].curves.indexOf(curve)

        if (indexCurve === -1) {
          curves.push(curve)
        }
      }
    }

    return curves
  }, [current, layers])

  // remove layer point
  const deleteLayerPoint = useCallback((index: number): void | boolean => {
    if (!remove) {
      return false
    }

    const currentPoint = index > 0 ? index - 1 : 0
    const points: PointTypePosition[] = []
    const curves = deleteLayerCurve(index)

    const temp = layers[current].points
    
    delete temp[index]

    for(let i = 0; i < temp.length; i++) {
      const point = temp[i]
      
      if (point) {
        if (index < i) {
          point.position = point.position - 1
        }
  
        points.push(point)
      }
    }

    updateLayer(current, { ...layers[current], curves, points, currentPoint })
  }, [current, deleteLayerCurve, layers, remove, updateLayer])

  // update layer point
  const updateLayerPoint = useCallback((point: PointTypePosition, index: number): void => {
    const { points } = layers[current]
    points[index] = point

    updateLayer(current, { ...layers[current], points })
  }, [current, layers, updateLayer])

  // update layer curve point
  const updateLayerCurvePoint = (
    index: number,
    init: number,
    end: number,
    curve: number[]
  ) => {
    const { points, curves: curveOld } = layers[current]
    const item = curveOld[index] // current curve
    
    if (item) {
      const curves = [...curveOld]

      const pointInit = getPointByPosition(points, init)
      const pointEnd = getPointByPosition(points, end)

      if (pointInit && pointEnd) {
        curves[index] = {
          curve,
          pointInit: pointInit.position,
          pointEnd: pointEnd.position,
        }

        updateLayer(current, { ...layers[current], curves })
      }
    }
  }

  // render
  return (
    <LayersContext.Provider
      value={{
        createLayer,
        current,
        createLayerCurve,
        createLayerPoint,
        deleteLayer,
        layers,
        deleteLayerPoint,
        setCurrent,
        updateLayer,
        updateLayerPoint,
        updateLayerCurvePoint,
      }}
    >
      {children}
    </LayersContext.Provider>
  )
}

export { LayersContext, LayersProvider }
export default LayersProvider
