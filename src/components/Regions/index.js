/* eslint-disable no-nested-ternary */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Pane, GeoJSON } from 'react-leaflet'
import { setRegion } from '../../actions'
import theme from '../../theme'
import { regionsSelector } from '../../selectors'


const active = {
  weight: 1,
  stroke: true,
  color: theme.boundary,
  fill: true,
  fillColor: 'white',
  fillOpacity: 0
}

const inactive = {
  weight: 1,
  stroke: true,
  color: theme.boundary,
  fill: true,
  fillColor: 'white',
  fillOpacity: 0.5
}

const stroke = {
  weight: 5,
  stroke: true,
  color: theme.boundary,
  fill: false
}

let id = 0
class Regions extends Component {
  render() {
    const { regions, click, selected, region } = this.props

    return (
      <div>
        {region && (
          <Pane name="region_selected" style={{ zIndex: 602 }}>
            <GeoJSON
              key={`${region.id} + selected`}
              data={region.geometry}
              style={stroke}
            />)
          </Pane>
        )}
        <Pane name="regions" style={{ zIndex: 601 }}>
          {regions && regions.filter(d => !!d.geometry).map(d => (
            <GeoJSON
              key={`${d.id} + ${id++}`}
              data={d.geometry}
              style={selected ? (d.id === selected ? active : inactive) : active}
              onClick={() => click(d.id)}
            />)
          )}
        </Pane>
      </div>
    )
  }
}

export default connect(state => ({
  regions: regionsSelector(state),
  selected: state.app.regionId,
  region: state.data.regionsById[state.app.regionId]
}), {
  click: setRegion
})(Regions)
