import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { clearProject } from '../../actions'
import ProjectDetails from '../ProjectDetails'
import style from './style.js'

export class ProjectModal extends Component {
  render() {
    const { isOpen, onClose } = this.props
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={style}
        contentLabel="Project details"
      >
        <ProjectDetails isOpen={isOpen} onRequestClose={onClose} />
      </Modal>
    )
  }
}

export default connect(state => ({
  isOpen: !!state.app.projectId
}), {
  onClose: clearProject
})(ProjectModal)
