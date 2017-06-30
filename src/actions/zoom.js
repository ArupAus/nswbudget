import { SET_ZOOM, INCREASE_ZOOM, DECREASE_ZOOM } from '../actionTypes'

export const setZoom = zoom => ({
  type: SET_ZOOM,
  payload: zoom
})

export const increaseZoom = () => ({
  type: INCREASE_ZOOM
})

export const decreaseZoom = () => ({
  type: DECREASE_ZOOM
})
