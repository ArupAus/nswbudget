import { parse } from 'qs'

export default location => {
  const state = {
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

  const query = parse(location.search.replace(/^\?/, ''))

  const pathname = location.pathname

  let parts
  if (pathname.match(/project\/(.*)/)) {
    parts = pathname.match(/project\/(.*)/)
    state.projectId = parts[1]
  } else if (pathname.match(/lga\/(.*)/)) {
    parts = pathname.match(/lga\/(.*)/)
    state.lgaId = parts[1]
  } else if (pathname.match(/region\/(.*)/)) {
    parts = pathname.match(/region\/(.*)/)
    state.regionId = parts[1]
  }

  if (query.info) {
    state.info = true
  }

  if (query.table) {
    state.table = true
  }
  if (query.category) {
    state.categoryId = query.category
  }

  if (query.category) {
    state.categoryId = query.category
  }

  return state
}
