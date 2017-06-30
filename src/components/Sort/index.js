import React, { Component } from 'react'
import { styled } from 'styletron-react'

const Container = styled('div', {
  marginTop: '8px',
  marginBottom: '8px',
  width: '100%',
  border: '1px solid #ccc',
  color: '#666',
  fontWeight: '500',
  padding: '12px 12px',
  fontSize: '14px'
})

export class Sort extends Component {
  render() {
    return (
      <Container>
        Sort by: Investment
      </Container>
    )
  }
}

export default Sort
