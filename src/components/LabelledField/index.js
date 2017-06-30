import React, { PureComponent } from 'react'
import { styled } from 'styletron-react'
import { FormattedMessage } from 'react-intl'

const Container = styled('div', {})
const Label = styled('label', {
  fontWeight: 'bold',
  fontSize: '12px',
  color: '#141414',
  lineHeight: '24px'
})

export class LabelledField extends PureComponent {
  render() {
    const { label, children, forId } = this.props
    return (
      <Container>
        <Label for={forId}><FormattedMessage id={label} /></Label>
        <div>{children}</div>
      </Container>
    )
  }
}

export default LabelledField
