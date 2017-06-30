import React, { Component } from 'react'
import { Icon } from 'leaflet'
import { Marker } from 'react-leaflet'

const iconProperties = {
  iconSize: [39, 52],
  iconAnchor: [19.5, 47]
}

const iconsCache = {}

class ProjectMarker extends Component {
  render() {
    const { project, active, select } = this.props
    if (!project.points.length) {
      return null
    }
    const iconPath = active ? project.category.icons.activePinIcon : project.category.icons.inactivePinIcon

    iconsCache[iconPath] = iconsCache[iconPath] || new Icon({
      iconUrl: iconPath,
      ...iconProperties
    })
    /* eslint-disable react/no-array-index-key */
    return (
      <div>
        {project.points.map((d, i) => (
          <Marker
            key={i}
            icon={iconsCache[iconPath]}
            position={[d[1], d[0]]}
            onClick={() => select(project.id)}
          />
        ))}
      </div>
    )
    /* eslint-enable react/no-array-index-key */
  }
}

export default ProjectMarker
