import React, { Component } from 'react'
import { styled } from 'styletron-react'
import theme from '../../theme.js'

const Container = styled('div', {
  backgroundColor: theme.filterBG,
  padding: '8px',
  boxShadow: 'inset 0px 1px 8px rgba(0, 0, 0, 0.3)',
  margin: '0 auto',
  textAlign: 'center',
  cursor: 'pointer'
})

export class MobileFiltersCollapsed extends Component {
  render() {
    const { onClick } = this.props
    return (
      <Container onClick={onClick}>
        ...
      </Container>
    )
  }
}

export default MobileFiltersCollapsed
