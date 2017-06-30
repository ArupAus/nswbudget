import { json } from 'd3-request'
import dataPath from '../../tmp/merged_data.json'
import { LOADED_DATA } from '../actionTypes'

import icons from '../icons'

const fetchAndProcessData = (cb) => {
  json(dataPath, (err, json) => {
    const data = json

    Object.keys(data.categoriesById).forEach(categoryId => {
      data.categoriesById[categoryId].icons = icons[categoryId]
    })

    cb(data)
  })
}

export default () => dispatch => {
  fetchAndProcessData(data => {
    dispatch({
      type: LOADED_DATA,
      payload: data
    })
  })
}
