import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { styled } from 'styletron-react'
import { connect } from 'react-redux'
import { setProject, clearProject } from '../../actions'
import { filteredProjects } from '../../selectors'
import ProjectItem from '../ProjectItem'
import ListTitle from '../ListTitle'
// import LocalListTitle from '../LocalListTitle'

import ProjectList from '../ProjectList'

const Container = styled('div', {
  position: 'absolute',
  top: '16px',
  right: '16px',
  bottom: '16px',
  width: '280px',
  padding: '10px 16px',
  fontSize: '26px',
  zIndex: '2',
  overflowY: 'auto',
  overflowX: 'hidden',
  backgroundColor: 'rgba(255, 255, 255, 0.8)'
})

const Description = styled('div', {
  fontFamily: 'Gotham',
  fontSize: '12px',
  color: '#141414',
  lineHeight: '15px'
})

class Sidebar extends Component {
  render() {
    const { localProjects, select, selected, project, clearProject } = this.props
    return (
      <Container>
        {project ? (
          <ProjectItem key={project.id} active project={project} selected={selected} onSelect={clearProject} />
        ) : (
          <Description>
            <FormattedMessage id="sidebar" />
          </Description>
        )}
        {/* <ProjectList
          name={
            <FormattedMessage
              id="sidebar_list_count"
              values={{
                name: "Statewide",
                count: stateWideProjects.length
              }}
            />
          }
          projects={stateWideProjects}
        /> */}
        <ProjectList
          name={<ListTitle />}
          projects={localProjects}
          select={select}
          selected={selected}
          initialOpen
        />
      </Container>
    )
  }
}

export default connect(state => {
  const project = state.data.projectsById[state.app.projectId]
  let p = null
  if (project) {
    p = {
      ...project,
      category: state.data.categoriesById[project.categoryId],
      agency: state.data.agenciesById[project.agencyId],
      lgas: project.lgaIds.map(d => state.data.lgasById[d]),
      regions: project.regionIds.map(d => state.data.regionsById[d])
    }
  }

  return {
    localProjects: filteredProjects(state).map(d => ({
      ...d,
      category: state.data.categoriesById[d.categoryId],
      agency: state.data.agenciesById[d.agencyId],
      lgas: d.lgaIds.map(d => state.data.lgasById[d]),
      regions: d.regionIds.map(d => state.data.regionsById[d])
    })),
    selected: state.app.projectId,
    project: p
  }
  // stateWideProjects: projectsWithNoLocationSelector(state)
}, {
  select: setProject,
  clearProject
})(Sidebar)
