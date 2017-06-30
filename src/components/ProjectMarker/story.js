import React from 'react'
import { storiesOf } from '@storybook/react'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import ProjectMarker from './'
import { PROJECT_CATEGORY } from '../../const'

storiesOf("ProjectMarker", module)
  .addDecorator(story => (
    <Map
      center={[-32, 151]}
      style={{ height: 200 }}
      zoom={6}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/btsdatavisualisation/cj25pap6o004p2ql99t5x9xcj/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnRzZGF0YXZpc3VhbGlzYXRpb24iLCJhIjoiX3VZZWdoNCJ9.pz-apO3V61vdVAsT6D2tFw"
        subdomains={'1234'.split('')}
        maxNativeZoom={18}
        maxZoom={20}
      />
      {story()}
    </Map>
  ))
  .add('default', () => (
    <ProjectMarker
      project={{
        lat: -32,
        lon: 151,
        category: PROJECT_CATEGORY.EDUCATION
      }}
    />
  ))
