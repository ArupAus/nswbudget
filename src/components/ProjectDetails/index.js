import React, { PureComponent } from 'react'
import { styled } from 'styletron-react'
import { connect } from 'react-redux'
import ProjectItem from '../ProjectItem'
import ProjectMap from '../ProjectMap'
import closeIcon from '../../../images/nav/close.svg'

const Container = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap'
})

const InfoCloseIcon = styled('div', {
  position: 'absolute',
  right: '2px',
  top: '2px',
  cursor: 'pointer',
  width: '24px',
  height: 'auto',
  verticalAlign: 'top'
})

const NoLocation = styled('div', {
  width: '100%',
  color: '#666',
  textAlign: 'center',
  paddingTop: '32px'
})

export class ProjectDetails extends PureComponent {
  render() {
    const { project, isOpen, onRequestClose } = this.props
    return (
      <Container>
        <InfoCloseIcon onClick={() => onRequestClose(isOpen)}>
          <img src={closeIcon} alt="close" />
        </InfoCloseIcon>
        <ProjectItem project={project} active />
        {project.points.length ? <ProjectMap project={project} /> : <NoLocation>No location</NoLocation> }
      </Container>
    )
  }
}

export default connect(state => {
  const project = state.data.projectsById[state.app.projectId]
  return {
    project: {
      ...project,
      category: state.data.categoriesById[project.categoryId],
      agency: state.data.agenciesById[project.agencyId],
      lgas: project.lgaIds.map(d => state.data.lgasById[d]),
      regions: project.regionIds.map(d => state.data.regionsById[d])
    }
  }
})(ProjectDetails)
