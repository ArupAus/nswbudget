/* eslint-disable no-nested-ternary */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Pane, GeoJSON } from 'react-leaflet'
import { setLGA } from '../../actions'
import { lgasSelector } from '../../selectors'
import theme from '../../theme'

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
class LGAs extends Component {
  render() {
    const { lgas, click, selected, lga } = this.props
    return (
      <div>
        {lga && (
          <Pane name="lga_selected" style={{ zIndex: 604 }}>
            <GeoJSON
              key={`${lga.id} + selected`}
              data={lga.geometry}
              style={stroke}
            />)
          </Pane>
        )}
        <Pane name="lgas" style={{ zIndex: 603 }}>
          {lgas && lgas.filter(d => !!d.geometry).map(d => (
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
  lgas: lgasSelector(state),
  selected: state.app.lgaId,
  lga: state.data.lgasById[state.app.lgaId]
}), {
  click: setLGA
})(LGAs)
