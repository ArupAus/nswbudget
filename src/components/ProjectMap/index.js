import React, { Component } from 'react'
import { styled } from 'styletron-react'

import bbox from '@turf/bbox'
import { point } from '@turf/helpers'
import { Map as LMap, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import ProjectMarker from '../ProjectMarker'

const Map = styled(LMap, {
  flex: '1 1 100%'
})

export class ProjectMap extends Component {
  render() {
    const { project } = this.props
    if (!project.points.length) {
      return null
    }

    const pos = { }


    if (project.points.length > 1) {
      const box = bbox({
        type: 'FeatureCollection',
        features: project.points.map(d => point(d))
      })
      const bounds = [[box[1], box[0]], [box[3], box[2]]]
      pos.bounds = bounds
    } else {
      pos.center = [project.points[0][1], project.points[0][0]]
      pos.zoom = 12
    }


    return (
      <Map
        {...pos}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/btsdatavisualisation/cj3wlbymi0j8m2sqi4bwnx15k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnRzZGF0YXZpc3VhbGlzYXRpb24iLCJhIjoiX3VZZWdoNCJ9.pz-apO3V61vdVAsT6D2tFw"
          maxNativeZoom={18}
          maxZoom={20}
        />
        <ProjectMarker project={project} category={project.category} active />
      </Map>
    )
  }
}

export default ProjectMap
