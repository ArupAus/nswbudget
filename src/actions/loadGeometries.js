import { json } from 'd3-request'
import { feature } from 'topojson-client'
import { LOADED_LGAS, LOADED_REGIONS } from '../actionTypes'
import lgaPath from '../../tmp/lgas.json'
import { niceId } from '../util'

const map = {
  the_hills_shire: 'the_hills',
  sutherland_shire: 'sutherland',
}

export const buildLgas = (data) => {
  const { features } = feature(data, data.objects.cleanlgas)
  const lgasMap = {}

  features.filter(d => d.properties.lga !== 'UNINCORPORATED').forEach(d => {
    let id = niceId(d.id)
    if (map[id]) {
      id = map[id]
    }
    lgasMap[id] = {
      id,
      fromGeom: true,
      geometry: d.geometry,
      regionId: niceId(d.properties.region)
    }
  })
  console.log(Object.keys(lgasMap).length, features.length)
  return lgasMap
}

export const buildRegions = (data) => {
  const regionfeatures = feature(data, data.objects.regions).features
  const regionsMap = {}
  regionfeatures.forEach(d => {
    const id = niceId(d.id)
    regionsMap[id] = {
      fromGeom: true,
      id,
      geometry: d.geometry
    }
  })
  return regionsMap
}

export default () => (dispatch) => {
  json(lgaPath, (err, data) => {
    if (err) {
      throw new Error("Failed to get geometries")
    }

    const lgasMap = buildLgas(data)

    dispatch({
      type: LOADED_LGAS,
      payload: lgasMap
    })

    const regionsMap = buildRegions(data)

    dispatch({
      type: LOADED_REGIONS,
      payload: regionsMap
    })
  })
}
