import React, { Component } from 'react'
import { styled } from 'styletron-react'
import { connect } from 'react-redux'
import { refreshPage as refresh } from '../../actions'
import RefreshIcon from '../../../images/nav/refresh.svg'

const RefreshButton = styled('div', {
  cursor: 'pointer',
  borderRadius: '4px',
  boxShadow: '0 2px 5px 0 rgba(0,0,0,0.32)',
  background: '#FFF',
  height: '24px',
})

export class RefreshControl extends Component {
  render() {
    const { refresh } = this.props
    return (
      <RefreshButton onClick={refresh}>
        <img src={RefreshIcon} alt="refresh" />
      </RefreshButton>
    )
  }
}

export default connect(null, {
  refresh
})(RefreshControl)
