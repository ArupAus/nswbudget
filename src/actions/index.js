import { CLEAR_FILTER } from '../actionTypes'

export { default as loadGeometries } from './loadGeometries'
export { default as loadData } from './loadData'
export { default as loadMeta } from './loadMeta'
export { toggleCategory, clearCategory } from './category'
export { setSearchFilter, clearQuery, setQuery } from './search'
export { setLGA, clearLGA } from './lga'
export { setRegion, clearRegion } from './region'
export { toggleStatewide } from './statewide'
export { setProject, clearProject } from './project'
export { setZoom, increaseZoom, decreaseZoom } from './zoom'
export { setTable } from './navigation'
export { toggleInfo } from './info'
export { refreshPage } from './refresh'

export const clearFilter = () => ({
  type: CLEAR_FILTER
})
