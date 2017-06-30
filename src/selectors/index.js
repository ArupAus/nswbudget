import { createSelector } from 'reselect'
import { toArray } from '../util'


const lgas = state => state.data.lgasById
const regions = state => state.data.regionsById
const projects = state => state.data.projectsById
const query = state => state.app.query

export const lgasSelector = createSelector(lgas, (lgas) => toArray(lgas))
export const regionsSelector = createSelector(regions, (regions) => toArray(regions))
export const projectsSelector = createSelector(projects, (projects) => toArray(projects))

const lgasAndRegionsSelector = createSelector(lgasSelector, regionsSelector, (lgas, regions) => lgas.concat(regions))
const lgaRegionAndProjectsSelector = createSelector(lgasSelector, regionsSelector, projectsSelector, (lgas, regions, projects) => projects.concat(lgas, regions))

export const projectsWithLocationSelector = createSelector(
  projectsSelector,
  (projects) => {
    return projects.filter(project => project.points.length > 0)
  }
)

export const projectsWithNoLocationSelector = createSelector(
  projectsSelector,
  (projects) => {
    return projects.filter(project => project.points.length === 0)
  }
)

export const filteredProjects = state => {
  return Object.keys(state.data.projectsById).map(d => state.data.projectsById[d])
    .filter(d => {
      // NOTE: this has been compressed for marginal speed benefit
      if ((state.app.statewide && d.points.length !== 0) ||
      (!!state.app.lgaId && d.lgaIds.indexOf(state.app.lgaId) === -1) ||
      (!!state.app.regionId && d.regionIds.indexOf(state.app.regionId) === -1) ||
      (!!state.app.categoryId && state.app.categoryId !== d.categoryId) ||
      (!!state.app.searchFilter && d.name.toLowerCase().indexOf(state.app.searchFilter.toLowerCase()) === -1)) {
        return false
      }
      return true
    })
}

export const filteredProjectsTable = state => {
  return Object.keys(state.data.projectsById).map(d => state.data.projectsById[d])
    .filter(d => {
      // NOTE: this has been compressed for marginal speed benefit
      if ((state.app.statewide && d.points.length !== 0) ||
      (!!state.app.projectId && d.id !== state.app.projectId) ||
      (!!state.app.lgaId && d.lgaIds.indexOf(state.app.lgaId) === -1) ||
      (!!state.app.regionId && d.regionIds.indexOf(state.app.regionId) === -1) ||
      (!!state.app.categoryId && state.app.categoryId !== d.categoryId) ||
      (!!state.app.searchFilter && d.name.toLowerCase().indexOf(state.app.searchFilter.toLowerCase()) === -1)) {
        return false
      }
      return true
    })
}


export const locationSearch = createSelector(
  lgasAndRegionsSelector,
  query,
  (lgasAndRegions, query) => {
    return lgasAndRegions
      .filter(d => d.from_data)
      .filter(d => {
        if (d.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
          return true
        }
        if (d.postcodes && d.postcodes.filter(d => d.indexOf(query) !== -1).length > 0) {
          return true
        }
        if (d.suburbs && d.suburbs.filter(d => d.toLowerCase().indexOf(query.toLowerCase()) !== -1).length > 0) {
          return true
        }
        return false
      })
  }
)

export const locationAndProjectSearch = createSelector(
  lgaRegionAndProjectsSelector,
  query,
  (lgasRegionsAndProjects, query) => {
    return lgasRegionsAndProjects
      .filter(d => d.from_data || d.type === 'project')
      .filter(d => {
        if (d.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
          return true
        }
        if (d.postcodes && d.postcodes.filter(d => d.indexOf(query) !== -1).length > 0) {
          return true
        }
        if (d.suburbs && d.suburbs.filter(d => d.toLowerCase().indexOf(query.toLowerCase()) !== -1).length > 0) {
          return true
        }
        return false
      })
  }
)

//
// export const projectsFilteredByLocationSelector = createSelector(
//   projectsWithLocationSelector,
//   areaSelector,
//   (projects, area) => {
//     switch (area.type) {
//       case GEOMETRY_TYPES.REGION:
//         return projects.filter(project => Object.values(REGIONS).indexOf(project.region) === Object.keys(REGIONS).indexOf(area.id))
//       case GEOMETRY_TYPES.LGA:
//         // TO BE IMPLEMENTED WHEN WE HAVE LGA DATA
//         return projects
//       default:
//         return projects
//     }
//   }
// )

// export const regionsArraySelector = createSelector(regionsSelector, regions => Object.keys(regions).map(id => regions[id]))
// export const lgasArraySelector = createSelector(lgasSelector, lgas => Object.keys(lgas).map(id => lgas[id]))
//
// export const unselectedRegionsArraySelector = createSelector(
//   regionsArraySelector,
//   areaSelector,
//   (regions, area) => area.id !== null && GEOMETRY_TYPES.REGION === area.type ? regions.filter(region => region.id !== area.id) : regions
// )
//
// export const unselectedLGAsArraySelector = createSelector(
//   lgasArraySelector,
//   areaSelector,
//   (lgas, area) => area.id !== null && GEOMETRY_TYPES.LGA === area.type ? lgas.filter(lga => lga.id !== area.id) : lgas
// )
//
// export const selectedRegionSelector = createSelector(
//   regionsArraySelector,
//   areaSelector,
//   (regions, area) => {
//     if (area.id !== null && area.type === GEOMETRY_TYPES.REGION) {
//       return regions.filter(region => region.id === area.id)[0]
//     }
//     return null
//   }
// )
//
// export const selectedLGASelector = createSelector(
//   lgasArraySelector,
//   areaSelector,
//   (lgas, area) => {
//     if (area.id !== null && area.type === GEOMETRY_TYPES.LGA) {
//       return lgas.filter(lga => lga.id === area.id)[0]
//     }
//     return null
//   }
// )
