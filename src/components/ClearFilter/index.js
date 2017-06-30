import React, { Component } from 'react'
import { styled } from 'styletron-react'
import { connect } from 'react-redux'
import { clearFilter } from '../../actions'

const Container = styled('button', {
  background: 'none',
  border: 'none',
  color: '#1170B2',
  lineHeight: '40px',
  cursor: 'pointer'
})

export class ClearFilter extends Component {
  render() {
    const { clear } = this.props
    return (
      <Container onClick={clear}>
        Clear&nbsp;Filter
      </Container>
    )
  }
}

export default connect(null, {
  clear: clearFilter
})(ClearFilter)
