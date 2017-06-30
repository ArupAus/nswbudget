import React, { Component } from 'react'
import { styled } from 'styletron-react'
import { connect } from 'react-redux'
import { toggleStatewide } from '../../actions'

const Container = styled('div', {
  marginBottom: '16px'
})

const Link = styled('span', d => ({
  fontSize: '12px',
  fontWeight: d.active ? 'bold' : 'normal',
  position: 'relative',
  cursor: 'pointer',
  ':not(:last-child)': {
    marginRight: '16px',
  },
  '::after': {
    content: "''",
    display: d.active ? 'block' : 'none',
    position: 'absolute',
    bottom: '-4px',
    left: 0,
    right: 0,
    background: 'black',
    height: '2px'
  }
}))

export class Toggle extends Component {
  render() {
    const { statewide, toggle } = this.props
    return (
      <Container>
        <Link active={!statewide} onClick={toggle}>All projects</Link>
        <Link active={!!statewide} onClick={toggle}>Statewide projects</Link>
      </Container>
    )
  }
}

export default connect(state => ({
  statewide: !!state.app.statewide
}), {
  toggle: toggleStatewide
})(Toggle)
