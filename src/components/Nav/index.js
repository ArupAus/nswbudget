import React, { Component } from 'react'
import { connect } from 'react-redux'
import { styled } from 'styletron-react'
import { toggleInfo, setTable } from '../../actions'
import InfoModal from '../InfoModal'

const Container = styled('div', {
  fontSize: '12px'
})

const Link = styled('a', (props) => ({
  cursor: 'pointer',
  textDecoration: props.active ? 'underline' : 'none',
  marginLeft: '40px',
  ':hover': {
    textDecoration: 'underline',
  }
}))

export class Nav extends Component {
  render() {
    const { table, setTable, toggleInfo } = this.props
    return (
      <Container>
        <Link active={!table} onClick={() => setTable(false)}>
          Map explorer
        </Link>
        <Link active={table} onClick={() => setTable(true)}>
          List of projects
        </Link>
        <Link onClick={toggleInfo}>
          More information
        </Link>
        <InfoModal />
      </Container>
    )
  }
}

export default connect(state => ({
  table: state.app.table,
}), {
  setTable,
  toggleInfo
})(Nav)
