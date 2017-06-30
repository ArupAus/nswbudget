import fs from 'fs'
import path from 'path'
import parse from 'csv-parse/lib/sync'

const mappingFile = fs.readFileSync(path.join(__dirname, '..', 'data', 'lga_region.csv'),'utf-8')
const geojson = fs.readFileSync(path.join(__dirname, '..', 'data', 'lgas_simplified.geojson'), 'utf-8')
const json = JSON.parse(geojson)

const records = parse(mappingFile, { columns: true })
const mapping = {}

records.forEach(d => mapping[d['LGANAME *']] = d.Region)

json.features.forEach(d => {
  let region = mapping[d.properties.nsw_lga__3]
  if (!region){
    region = mapping[d.properties.nsw_lga__3.replace(' SHIRE', '')]
  }
  d.properties = {
    lga: d.properties.nsw_lga__3,
    region,
    id: d.properties.nsw_lga__3
  }
})

fs.writeFileSync(path.join(__dirname, '..', 'tmp', 'lgas_simplified_w_region.json'), JSON.stringify(json), 'utf-8')
