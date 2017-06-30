import React, { PureComponent } from 'react'
import { styled } from 'styletron-react'
import { connect } from 'react-redux'
import { increaseZoom, decreaseZoom } from '../../actions'

const ZoomContainer = styled('div', {
  borderRadius: '4px',
  boxShadow: '0 2px 5px 0 rgba(0,0,0,0.32)',
  width: '24px',
  fontFamily: 'Roboto',
  fontWeight: '300',
  fontSize: '16px',
  color: '#000',
  marginTop: '200px',
})

const Button = styled('div', {
  background: '#FFF',
  height: '19px',
  textAlign: 'center',
  cursor: 'pointer',
})

const MinusButton = styled(Button, {
  borderBottomLeftRadius: '4px',
  borderBottomRightRadius: '4px',
})

const PlusButton = styled(Button, {
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
})

const Divider = styled('div', {
  background: 'black',
  height: '1px',
  width: '100%',
})

export class ZoomControl extends PureComponent {
  render() {
    const { increase, decrease } = this.props
    return (
      <ZoomContainer>
        <PlusButton onClick={increase}>+</PlusButton>
        <Divider />
        <MinusButton onClick={decrease}>-</MinusButton>
      </ZoomContainer>
    )
  }
}

export default connect(state => ({
  zoom: state.app.zoom,
  state // very rare case when we want to know everything so we can set the right pos
}), {
  increase: increaseZoom,
  decrease: decreaseZoom
})(ZoomControl)

// export default ZoomControl
