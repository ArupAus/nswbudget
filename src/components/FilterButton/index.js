import React, { Component } from 'react'
import { styled } from 'styletron-react'
import ClosePath from '../../../images/nav/close.svg'

const CloseButton = styled('img', {
  height: '18px',
  width: '14px',
  verticalAlign: 'middle',
})

const Container = styled('button', {
  border: '1px solid #ccc',
  padding: '4px 4px',
  borderRadius: '4px',
  background: 'white',
  fontSize: '14px',
  lineHeight: '18px',
  fontWeight: 'normal',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
})

export class FilterButton extends Component {
  render() {
    const { onClose, name } = this.props
    return (
      <Container onClick={onClose}>
        {name} <CloseButton src={ClosePath} />
      </Container>
    )
  }
}

export default FilterButton
