import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { styled } from 'styletron-react'
import map from 'lodash.map'
// import { ProjectTypeTileIcon } from '../Icons/projectTypeTiles'

// move to constants
const projectTypes = [
  'Community Services',
  'Education',
  'Government Services',
  'Health',
  'Police and Justice',
  'Roads',
  'Transport',
  'Utilities',
]

const Icons = styled('div', {})
const Container = styled('div', {
  position: 'relative',
  width: '100%',
  zIndex: '3',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'inline-block'
})

const Heading = styled('div', {
  fontSize: '12px',
  color: '#141414',
  opacity: '1',
  paddingBottom: '2px'
})

class ProjTypeFilter extends Component {
  render() {
    return (
      <Container>
        <Heading>
          <FormattedMessage id="project type heading" />
        </Heading>
        <Icons>
          {map(projectTypes, d => {
            return <div>Tile {d}</div>
            // return <ProjectTypeTileIcon key={d} id={d.replace(/\s/g, '_')} />
          })}
        </Icons>
      </Container>
    )
  }
}

export default ProjTypeFilter
