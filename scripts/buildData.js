import fs from 'fs'
import path from 'path'
import { niceId } from '../src/util'
import { buildLgas } from '../src/actions/loadGeometries'

const dataFile = fs.readFileSync(path.join(__dirname, '..', 'data', 'data.json'), 'utf-8')
const dataJson = JSON.parse(dataFile)
const lgaFile = fs.readFileSync(path.join(__dirname, '..', 'tmp', 'lgas.json'), 'utf-8')
const lgaJson = JSON.parse(lgaFile)

const data = {
  projectsById: {},
  categoriesById: {},
  agenciesById: {},
  lgasById: {},
  regionsById: {}
}
let id = 1

dataJson.features.forEach(d => {
  const categoryId = niceId(d.properties.Category)
  const agencyId = niceId(d.properties.AgencyName)

  const lgasMap = {}
  if (d.properties.LGA) {
    d.properties.LGA.split(',').forEach(d => {
      const name = d.trim()
      const id = niceId(name)
      lgasMap[id] = name
    })
  }

  const regionsMap = {}
  if (d.properties.Region) {
    d.properties.Region.split(',').forEach(d => {
      const name = d.trim()
      const id = niceId(name)
      regionsMap[id] = name
    })
  }

  const etc = typeof d.properties.ETC !== 'undefined' ? d.properties.ETC * 1000 : null
  const budget = typeof d.properties.Allocation201718 !== 'undefined' ? d.properties.Allocation201718 * 1000 : null

  let points = []

  if (d.geometry) {
    if (d.geometry.type === 'MultiPoint') {
      points = d.geometry.coordinates
    } else if (d.geometry.type === 'Point') {
      points = [d.geometry.coordinates]
    } else {
      throw new Error(`Unknown type ${d.geometry.type}`)
    }
  }

  const project = {
    type: 'project',
    id: id++,
    name: d.properties.ProjectName,
    categoryId,
    agencyId,
    lgaIds: Object.keys(lgasMap),
    regionIds: Object.keys(regionsMap),
    etc,
    budget,
    points
  }
  data.projectsById[project.id] = project

  data.agenciesById[agencyId] = data.agenciesById[agencyId] || {
    type: 'agency',
    id: agencyId,
    name: d.properties.AgencyName,
  }

  data.categoriesById[categoryId] = data.categoriesById[categoryId] || {
    type: 'category',
    id: categoryId,
    name: d.properties.Category,
    icons: []
  }

  Object.keys(lgasMap).forEach(lgaId => {
    data.lgasById[lgaId] = data.lgasById[lgaId] || {
      type: 'lga',
      id: lgaId,
      name: lgasMap[lgaId],
      from_data: true
    }
  })

  Object.keys(regionsMap).forEach(regionId => {
    data.regionsById[regionId] = data.regionsById[regionId] || {
      type: 'region',
      id: regionId,
      name: regionsMap[regionId],
      from_data: true
    }
  })
})

const lgasMap = buildLgas(lgaJson)

const mergedLGAs = {
  ...data.lgasById
}
Object.keys(lgasMap).forEach(i => {
  const name = i.split("_").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ")
  lgasMap[i].name = name
  mergedLGAs[i] = {
    ...mergedLGAs[i],
    ...lgasMap[i]
  }
})
data.lgasById = mergedLGAs

fs.writeFileSync(path.join(__dirname, '..', 'tmp', 'merged_data.json'), JSON.stringify(data), 'utf-8')
