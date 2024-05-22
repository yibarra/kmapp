import { createContext, useCallback, useContext, useState } from 'react'

import { getCurveExist, getPointExistInCurve, orderPoints } from './helpers'
import type { CurveType, LayerProps, LayersContextProps, LayersProvidersProps, PointTypePosition } from './interfaces'
import { UIContext } from '../UIProvider/UIProvider'

// layers context
const LayersContext = createContext({} as LayersContextProps)

// layers provider
const LayersProvider = ({ children, data: dataInit, enable, remove }: LayersProvidersProps) => {
  const { setEnable } = useContext(UIContext)
  const [current, setCurrent] = useState<number | null>(null) // index current
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
      const newLayer = [...oldLayers, layer]

      setCurrent(newLayer.length - 1)
      setEnable(true)

      return newLayer
    })
  }, [setEnable])

  // create curve
  const createLayerCurve = useCallback((
    pointInit: PointTypePosition,
    pointEnd: PointTypePosition,
    pointCurve: PointTypePosition,
  ) => {
    if (current === null) {
      return false
    }

    const curves: CurveType[] = layers[current].curves ?? []
    const checked = getCurveExist(curves, pointCurve.position)

    if (!checked) {
      const { points } = layers[current]

      const init = points[pointInit.position]
      const end = points[pointEnd.position]

      curves.push({ pointInit: init.position, pointEnd: end.position, curve: pointCurve.position })

      const updatedCurves = curves
        .sort((a, b) => a.pointInit - b.pointInit)
        .map(curve => {
          if (curve.pointInit > end.position) {
            return { ...curve, pointInit: curve.pointInit - 1, pointEnd: curve.pointEnd - 1 }
          }
      
          return curve
        })
  
      updateLayer(current, { ...layers[current], curves: updatedCurves, points })
    }
  }, [current, layers, updateLayer])

  // update layer points
  const createLayerPoint = useCallback((index: number, point: PointTypePosition): void | boolean => {
    if (!enable || typeof current !== 'number') {
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
    if (typeof current !== 'number') {
      return []
    }

    const curves = []

    const curvesRemoves = getPointExistInCurve(layers[current].curves, index)

    if (Array.isArray(curvesRemoves)) {
      for (const curve of curvesRemoves) {
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
    if (!remove || typeof current !== 'number') {
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
  const updateLayerPoint = (point: PointTypePosition, index: number): void => {
    if (typeof current === 'number') {
      const { points } = layers[current]
      points[index] = point
  
      updateLayer(current, { ...layers[current], points })
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
      }}
    >
      {children}
    </LayersContext.Provider>
  )
}

export { LayersContext, LayersProvider }
export default LayersProvider
