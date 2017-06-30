import { TOGGLE_CATEGORY, CLEAR_CATEGORY } from '../actionTypes'

export const toggleCategory = categoryId => ({
  type: TOGGLE_CATEGORY,
  payload: categoryId
})

export const clearCategory = () => ({
  type: CLEAR_CATEGORY
})
