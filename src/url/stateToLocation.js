import { stringify } from 'qs'

export default state => {
  let pathname = '/'
  const query = {}

  // pathname
  if (state.projectId) {
    pathname = `/project/${state.projectId}`
  } else if (state.lgaId) {
    pathname = `/lga/${state.lgaId}`
  } else if (state.regionId) {
    pathname = `/region/${state.regionId}`
  }

  if (state.info) {
    query.info = true
  }
  if (state.table) {
    query.table = true
  }
  if (state.categoryId) {
    query.category = state.categoryId
  }

  return {
    pathname,
    search: stringify(query)
  }
}
