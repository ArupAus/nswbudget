import React, { PureComponent } from 'react'
import { styled } from 'styletron-react'
import { FormattedMessage } from 'react-intl'
import { format } from 'd3-format'
import closeIcon from '../../../images/nav/close.svg'
import { PROJECT_CLOSE_ICON_SIZE } from '../../const'

const formatVal = format(',.0f')

const Container = styled('div', {
  paddingTop: '8px',
  paddingBottom: '8px',
})

const InfoCloseIcon = styled('div', {
  position: 'absolute',
  right: '5px',
  top: '5px',
  cursor: 'pointer',
  width: '24px',
  height: 'auto',
  verticalAlign: 'top'
})

const Level = styled('div', {
  ':not(:last-child)': {
    borderBottom: '1px solid #e0e0e0',
  },
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  cursor: 'pointer'
})

const Img = styled('img', {
  alignSelf: 'flex-start',
  marginRight: '8px',
})

const Rest = styled('div', {
  flex: '1 1 100%',
})

const Name = styled('div', {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#141414',
  lineHeight: '15px',
})

const Value = styled('div', {
  fontSize: '12px',
  lineHeight: '15px',
})

const Title = styled(Value, {
  color: '#9B9B9B'
})

export class ProjectItem extends PureComponent {
  renderLocation() {
    const { project } = this.props
    let location = ''
    if (project.lgas.length === 1) {
      location = project.lgas[0].name
    } else if (project.lgas.length > 1) {
      location = 'Multiple LGAs'
    }
    if (location.length) {
      location += ' | '
    }
    if (project.regions.length === 1) {
      location += project.regions[0].name
    } else if (project.regions.length > 1) {
      location += 'Multiple Regions'
    } else {
      location += 'Statewide'
    }
    if (location === 'Multiple LGAs | Multiple Regions') {
      location = "Multiple locations"
    }
    return location
  }
  onClick = () => {
    const { project, onSelect } = this.props
    if (typeof onSelect === 'function') {
      onSelect(project.id)
    }
  }
  render() {
    const { project, active, selected, onSelect } = this.props
    const geolocatable = project.points.length > 0
    const activeText = active ? 'active' : 'inactive'
    const typeText = geolocatable ? 'Pin' : 'Tile'
    return (
      <Container onClick={this.onClick}>
        <InfoCloseIcon onClick={() => onSelect('')}>
          { project.id === selected ? <img src={closeIcon} width={PROJECT_CLOSE_ICON_SIZE} height={PROJECT_CLOSE_ICON_SIZE} alt="close" /> : null }
        </InfoCloseIcon>
        <Level>
          <Img src={project.category.icons[`${activeText + typeText}Icon`]} />
          <Rest>
            <Name>{project.name}</Name>
            <Value>{this.renderLocation()}</Value>
            <Title><FormattedMessage id="projectagency" /></Title>
            <Value>{project.agency.name}</Value>
            <Title><FormattedMessage id="projectcost" /></Title>
            <Value style={{ color: project.budget ? '#000000' : 'rgb(155, 155, 155)' }}>{ project.budget ? `$${formatVal(project.budget)}` : 'N.A.' }</Value>
            <Title><FormattedMessage id="projectetc" /></Title>
            <Value style={{ color: project.etc ? '#000000' : 'rgb(155, 155, 155)' }}>{ project.etc ? `$${formatVal(project.etc)}` : 'N.A.' }</Value>
          </Rest>
        </Level>
      </Container>
    )
  }
}

export default ProjectItem
