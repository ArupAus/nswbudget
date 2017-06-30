import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { filteredProjects } from '../../selectors'
import ProjectItem from '../ProjectItem'
import { setProject } from '../../actions'

export class List extends PureComponent {
  render() {
    const { projects, select } = this.props
    return (
      <div>
        {projects.map(d => (
          <ProjectItem key={d.id} project={d} onSelect={select} active />
        ))}
      </div>
    )
  }
}

export default connect(state => ({
  projects: filteredProjects(state).map(d => ({
    ...d,
    category: state.data.categoriesById[d.categoryId],
    agency: state.data.agenciesById[d.agencyId],
    lgas: d.lgaIds.map(d => state.data.lgasById[d]),
    regions: d.regionIds.map(d => state.data.regionsById[d])
  }))
}), {
  select: setProject
})(List)
