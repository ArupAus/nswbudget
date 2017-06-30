import React, { Component } from 'react'
import { styled } from 'styletron-react'
import { connect } from 'react-redux'
import { filteredProjects } from '../../selectors'

const Container = styled('div', {
  paddingTop: '8px',
  paddingBottom: '8px'
})

export class Summary extends Component {
  render() {
    const { count } = this.props
    return (
      <Container>
        {count} Projects in NSW
      </Container>
    )
  }
}

export default connect(state => ({
  count: filteredProjects(state).length
}))(Summary)
