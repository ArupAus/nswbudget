import {
  TOGGLE_CATEGORY,
  SET_SEARCH_FILTER,
  CLEAR_QUERY,
  SET_QUERY,
  SET_LGA,
  SET_REGION,
  TOGGLE_STATEWIDE,
  SET_PROJECT,
  CLEAR_PROJECT,
  SET_ZOOM,
  INCREASE_ZOOM,
  DECREASE_ZOOM,
  SET_TABLE,
  TOGGLE_INFO,
  CLEAR_CATEGORY,
  CLEAR_FILTER,
  REFRESH_PAGE
} from '../actionTypes'

import {
  MAX_ZOOM,
  MIN_ZOOM
} from '../const'

const intitialState = {
  projectId: null,
  regionId: null,
  lgaId: null,
  categoryId: null,
  searchFilter: '',
  query: '',
  statewide: false,
  zoom: 6,
  table: false,
  info: false
}

export default function (state = intitialState, action) {
  switch (action.type) {
    case TOGGLE_CATEGORY: {
      return {
        ...state,
        categoryId: state.categoryId === action.payload ? null : action.payload
      }
    }
    case CLEAR_CATEGORY: {
      return {
        ...state,
        categoryId: null
      }
    }
    case SET_SEARCH_FILTER: {
      return {
        ...state,
        searchFilter: action.payload
      }
    }
    case CLEAR_QUERY: {
      return {
        ...state,
        query: intitialState.query
      }
    }
    case SET_QUERY: {
      return {
        ...state,
        query: action.payload
      }
    }
    case SET_LGA: {
      return {
        ...state,
        lgaId: action.payload,
        regionId: null,
        projectId: null,
        query: ''
      }
    }
    case SET_REGION: {
      return {
        ...state,
        regionId: action.payload,
        lgaId: null,
        projectId: null,
        query: ''
      }
    }
    case TOGGLE_STATEWIDE: {
      return {
        ...state,
        statewide: !state.statewide
      }
    }
    case SET_PROJECT: {
      return {
        ...state,
        projectId: action.payload
      }
    }
    case CLEAR_PROJECT: {
      return {
        ...state,
        projectId: null
      }
    }
    case SET_ZOOM:
      return {
        ...state,
        zoom: action.payload
      }
    case INCREASE_ZOOM:
      return (state.zoom == MAX_ZOOM) ? state : {
        ...state,
        zoom: state.zoom + 1
      }
    case DECREASE_ZOOM:
      return (state.zoom == MIN_ZOOM) ? state : {
        ...state,
        zoom: state.zoom - 1
      }
    case SET_TABLE:
      return {
        ...state,
        table: action.payload
      }
    case TOGGLE_INFO:
      return {
        ...state,
        info: !state.info
      }
    case CLEAR_FILTER: {
      return {
        ...state,
        projectId: null,
        lgaId: null,
        regionId: null,
        categoryId: null
      }
    }
    case REFRESH_PAGE:
      return {
        ...state,
        zoom: MIN_ZOOM
      }
    default:
      return state
  }
}
