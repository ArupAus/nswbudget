import React, { Component } from 'react'
import { styled } from 'styletron-react'
import { Map as LMap, TileLayer } from 'react-leaflet'
import { connect } from 'react-redux'
import bbox from '@turf/bbox'
import { point } from '@turf/helpers'

import LGAs from '../LGAs'
import Regions from '../Regions'
import ProjectMarkers from '../ProjectMarkers'

import { loadGeometries, setZoom } from '../../actions'

import {
  MAX_ZOOM,
  MIN_ZOOM
} from '../../const'

const FlexMap = styled(LMap, {
  flex: '1 1 100%',
  zIndex: '1'
})

const flyProps = {
  paddingBottomRight: [328, 0]
}

export class Map extends Component {
  componentDidMount() {
    this.props.loadGeometries()
    this.flyTo()
  }
  componentDidUpdate(props) {
    if (
      (this.props.state.data.projectsById !== props.state.data.projectsById) ||
      (this.props.state.app.projectId !== props.state.app.projectId) ||
      (this.props.state.app.regionId !== props.state.app.regionId) ||
      (this.props.state.app.lgaId !== props.state.app.lgaId)
    ) {
      this.flyTo()
    }
  }
  flyTo = () => {
    const { app, data } = this.props.state
    if (app.projectId) {
      // find the project
      const project = data.projectsById[app.projectId]
      if (project.points.length) {
        if (project.points.length > 1) {
          const box = bbox({
            type: 'FeatureCollection',
            features: project.points.map(d => point(d))
          })
          const bounds = [[box[1], box[0]], [box[3], box[2]]]
          this.ref.leafletElement.flyToBounds(bounds, flyProps)
        } else {
          this.ref.leafletElement.flyTo([project.points[0][1], project.points[0][0]], this.props.zoom, flyProps)
        }
      } else if (project.lgaIds.length) {
        const lgas = project.lgaIds.map(d => data.lgasById[d])
        const box = bbox({
          type: 'FeatureCollection',
          features: lgas.map(d => ({
            geometry: d.geometry
          }))
        })
        const bounds = [[box[1], box[0]], [box[3], box[2]]]
        this.ref.leafletElement.flyToBounds(bounds, flyProps)
      } else if (project.regionIds.length) {
        const regions = project.regionIds.map(d => data.regionsById[d])
        const box = bbox({
          type: 'FeatureCollection',
          features: regions.map(d => ({
            geometry: d.geometry
          }))
        })
        const bounds = [[box[1], box[0]], [box[3], box[2]]]
        this.ref.leafletElement.flyToBounds(bounds, flyProps)
      } else {
        // fly to state
        // console.log('// fly to state')
      }
      return
    }
    if (app.lga) {
      // fly to lga
      // console.log("FLY TO LGA")
      // maybe this could be driven by the project location selection?
    }
    if (app.region) {
      // fly to region
      // console.log("FLY TO REGION")
      // maybe this could be driven by the project location selection?
    }
  }
  render() {
    const { zoom, setZoom } = this.props
    return (
      <FlexMap
        innerRef={d => this.ref = d}
        center={[-32.7891502, 148.282715]}
        zoom={zoom}
        maxBounds={[
          [-25.641526373065755, 139.130859375],
          [-37.85750715625203, 157.85156249999997]
        ]}
        bounds={[
          [-28.964068965384516, 145.80078125],
          [-36.61423141542417, 150.7646484375]
        ]}
        attributionControl={false}
        zoomControl={false}
        onZoomEnd={({ target }) => setZoom(target.getZoom())}
        minZoom={MIN_ZOOM}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/btsdatavisualisation/cj3wlbymi0j8m2sqi4bwnx15k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnRzZGF0YXZpc3VhbGlzYXRpb24iLCJhIjoiX3VZZWdoNCJ9.pz-apO3V61vdVAsT6D2tFw"
          maxNativeZoom={18}
          maxZoom={MAX_ZOOM}
        />
        <ProjectMarkers />
        {zoom > 9 && <LGAs />}
        {zoom <= 9 && <Regions />}

        {/* <div>
          <Pane name="lgas">
            {lgas && lgas.map(d => (
              <LGA
                key={d.id}
                data={d}
              />
            ))}
          </Pane>
          <Pane name="selectedLga">
            {selectedLGA && <LGA key={selectedLGA.id} data={selectedLGA} active />}
          </Pane>
          <Pane name="regions">
            {regions && regions.map(d => (
              <Region
                key={d.id}
                data={d}
              />
            ))}
          </Pane>
          <Pane name="selectedRegion">
            {selectedRegion && <Region key={selectedRegion.id} data={selectedRegion} active />}
          </Pane>
          <Pane name="projectMarkers">
            { projects.map(project => <ProjectMarker key={project.id} project={project} />) }
          </Pane>
        </div> */}
      </FlexMap>
    )
  }
}

export default connect(state => ({
  zoom: state.app.zoom,
  state // very rare case when we want to know everything so we can set the right pos
}), { loadGeometries, setZoom })(Map)
