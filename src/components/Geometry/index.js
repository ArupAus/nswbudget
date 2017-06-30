import React, { Component } from 'react'
import { GeoJSON } from 'react-leaflet'
import theme from '../../theme'

class Geometry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
    }
  }
  onMouseOver = () => {
    this.setState({
      hover: true,
    })
  }
  onMouseOut = () => {
    this.setState({
      hover: false,
    })
  }
  render() {
    const { data, active, selectable, weight, select } = this.props
    const { hover } = this.state

    return (
      <GeoJSON
        data={data}
        color={active ? theme.boundary : theme.inactive}
        weight={weight}
        fillOpacity={hover ? 0 : 0.3}
        fillColor={theme.main}
        opacity={1}
        fill={selectable}
        stroke={selectable}
        onClick={() => select(data.id)}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      />
    )
  }
}

export default Geometry
