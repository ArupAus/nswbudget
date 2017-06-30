import React, { Component } from 'react'

import MobileFiltersExpanded from '../MobileFiltersExpanded'
import MobileFiltersCollapsed from '../MobileFiltersCollapsed'

export class MobileFilters extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: true
    }
  }
  open = () => {
    this.setState({ open: true })
  }
  close = () => {
    this.setState({ open: false })
  }
  render() {
    const { open } = this.state
    return open ? <MobileFiltersExpanded onClose={this.close} /> : <MobileFiltersCollapsed onClick={this.open} />
  }
}

export default MobileFilters
