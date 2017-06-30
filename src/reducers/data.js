import {
  LOADED_DATA,
  LOADED_LGAS,
  LOADED_REGIONS,
  LOADED_META
} from '../actionTypes'


const intitialState = {
  projectsById: {},
  categoriesById: {},
  agenciesById: {},
  lgasById: {},
  regionsById: {}
}

export default function (state = intitialState, action) {
  switch (action.type) {
    case LOADED_DATA: {
      const { payload } = action

      const mergedLGAs = {
        ...state.lgasById
      }

      Object.keys(action.payload.lgasById).forEach(i => {
        mergedLGAs[i] = {
          ...mergedLGAs[i],
          ...action.payload.lgasById[i]
        }
      })
      const mergedRegions = {
        ...state.regionsById
      }
      Object.keys(action.payload.regionsById).forEach(i => {
        mergedRegions[i] = {
          ...mergedRegions[i],
          ...action.payload.regionsById[i]
        }
      })
      return {
        ...state,
        projectsById: payload.projectsById,
        categoriesById: payload.categoriesById,
        lgasById: mergedLGAs,
        regionsById: mergedRegions,
        agenciesById: payload.agenciesById
      }
    }
    case LOADED_LGAS: {
      const mergedLGAs = {
        ...state.lgasById
      }
      Object.keys(action.payload).forEach(i => {
        mergedLGAs[i] = {
          ...mergedLGAs[i],
          ...action.payload[i]
        }
      })
      return {
        ...state,
        lgasById: mergedLGAs
      }
    }
    case LOADED_REGIONS: {
      const mergedRegions = {
        ...state.regionsById
      }
      Object.keys(action.payload).forEach(i => {
        mergedRegions[i] = {
          ...mergedRegions[i],
          ...action.payload[i]
        }
      })
      return {
        ...state,
        regionsById: mergedRegions
      }
    }
    case LOADED_META: {
      const mergedLGAs = {
        ...state.lgasById
      }
      Object.keys(action.payload).forEach(i => {
        mergedLGAs[i] = {
          ...mergedLGAs[i],
          ...action.payload[i]
        }
      })
      return {
        ...state,
        lgasById: mergedLGAs
      }
    }
    default:
      return state
  }
}
