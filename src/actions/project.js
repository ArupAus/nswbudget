import {
  SET_PROJECT,
  CLEAR_PROJECT
} from '../actionTypes'

export const setProject = projectId => ({
  type: SET_PROJECT,
  payload: projectId
})

export const clearProject = () => ({
  type: CLEAR_PROJECT
})
