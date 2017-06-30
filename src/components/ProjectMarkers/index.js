import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Pane } from 'react-leaflet'
import { filteredProjects } from '../../selectors'
import ProjectMarker from '../ProjectMarker'
import { setProject } from '../../actions'

const noop = () => undefined

export class ProjectMarkers extends Component {
  render() {
    const { projects, selected, select, project } = this.props
    return (
      <div>
        { project && (
          <Pane name="selectedprojectMarkers" style={{ zIndex: 606 }}>
            <ProjectMarker
              key={project.id}
              project={project}
              active
              select={noop}
            />
          </Pane>
        )}
        <Pane name="projectMarkers" style={{ zIndex: 605 }}>
          { projects.filter(d => d.id !== selected).map(project => (
            <ProjectMarker
              key={project.id}
              project={project}
              select={select}
              active={!selected}
            />
          ))}
        </Pane>
      </div>
    )
  }
}

export default connect(state => {
  let project = state.data.projectsById[state.app.projectId]
  if (project) {
    project = {
      ...project,
      category: state.data.categoriesById[project.categoryId]
    }
  }
  return {
    projects: filteredProjects(state).map(d => ({
      ...d,
      category: state.data.categoriesById[d.categoryId]
    })),
    selected: state.app.projectId,
    project
  }
}, {
  select: setProject
})(ProjectMarkers)
