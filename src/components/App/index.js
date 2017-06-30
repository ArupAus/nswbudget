import React, { Component } from 'react'
import Media from 'react-media'
import { connect } from 'react-redux'

import Desktop from '../Desktop'
import Mobile from '../Mobile'
import { loadData, loadMeta } from '../../actions'

export class App extends Component {
  componentDidMount() {
    this.props.loadData()
    this.props.loadMeta()
  }
  render() {
    return (
      <Media query="(max-width: 600px)">
        {matches => matches ? (
          <Mobile />
        ) : (
          <Desktop />
        )}
      </Media>
    )
  }
}

export default connect(null, { loadData, loadMeta })(App)
