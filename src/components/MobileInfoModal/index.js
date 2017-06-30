import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { toggleInfo } from '../../actions'
import style from './style'
import Info from '../Info'

export class InfoModal extends Component {
  render() {
    const { isOpen, onClose } = this.props
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={style}
        contentLabel="Project details"
      >
        <Info />
      </Modal>
    )
  }
}

export default connect(state => ({
  isOpen: state.app.info
}), {
  onClose: toggleInfo
})(InfoModal)
