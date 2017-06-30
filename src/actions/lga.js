import { SET_LGA } from '../actionTypes'

export const setLGA = lgaId => ({
  type: SET_LGA,
  payload: lgaId
})
export const clearLGA = () => ({
  type: SET_LGA,
  payload: null
})
