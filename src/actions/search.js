import {
  SET_SEARCH_FILTER,
  CLEAR_QUERY,
  SET_QUERY
} from '../actionTypes'

export const setSearchFilter = query => ({
  type: SET_SEARCH_FILTER,
  payload: query
})

export const clearQuery = () => ({
  type: CLEAR_QUERY
})

export const setQuery = query => ({
  type: SET_QUERY,
  payload: query
})
