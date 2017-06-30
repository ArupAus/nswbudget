import { SET_REGION } from '../actionTypes'

export const setRegion = regionId => ({
  type: SET_REGION,
  payload: regionId
})

export const clearRegion = () => ({
  type: SET_REGION,
  payload: null
})
