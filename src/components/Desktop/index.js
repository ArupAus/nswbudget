import React, { Component } from 'react'
import { connect } from 'react-redux'
import MapPage from '../MapPage'
import TablePage from '../TablePage'

export class Desktop extends Component {
  render() {
    const { table } = this.props
    if (table) {
      return <TablePage />
    }
    return <MapPage />
  }
}

export default connect(state => ({
  table: state.app.table
}))(Desktop)
