import React, { Component } from 'react'
import styles from './index.css'
import cls from 'classnames'

export class CollapseControl extends Component {
  click() {
    this.props.setFullscreen()
  }
  render() {
    let { fullscreen } = this.props
    let action = fullscreen ? 'Show' : 'Hide'
    let arrowClass = fullscreen ? styles.down : styles.up

    return (
      <div className={styles.collapseControl} onClick={::this.click}>
        <div className={styles.text}>{action} Project details</div>
        <div className={cls(styles.arrow, arrowClass)}></div>
      </div>
    )
  }
}
