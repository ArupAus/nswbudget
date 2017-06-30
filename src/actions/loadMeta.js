import { csv } from 'd3-request'
import { LOADED_META } from '../actionTypes'
import { niceId } from '../util'
import dataPath from '../../data/lga_postcodes_suburbs.csv'

const map = {
  the_hills_shire: 'the_hills',
  sutherland_shire: 'sutherland',
}

export default () => dispatch => {
  csv(dataPath, (err, data) => {
    if (err) {
      throw new Error("Failed to load postcodes and suburbs")
    }
    const out = {}
    data.forEach(d => {
      let id = niceId(d.lga)
      if (map[id]) {
        id = map[id]
      }
      const regionId = niceId(d.region)
      out[id] = {
        postcodes: d.postcodes.split(','),
        suburbs: d.suburbs.split(',').map(d => d.trim()),
        regionId
      }
    })
    dispatch({
      type: LOADED_META,
      payload: out
    })
  })
}
