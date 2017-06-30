import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { styled } from 'styletron-react'
import logo from '../../../images/logo.png'
import theme from '../../theme'
import MobileInfoModal from '../MobileInfoModal'
import infoPath from '../../../images/info.svg'
import { toggleInfo } from '../../actions'

const Container = styled('div', {
  padding: '4px 8px',
  backgroundColor: theme.main,
  width: '100%',
  borderBottom: '1px solid #ccc'
})

const Level = styled('div', {
  position: 'relative',
  fontSize: '16px',
  fontFamily: 'sans-serif',
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'space-between'
})

const Item = styled('div', {
  flexBasis: 'auto',
  display: 'inline-block flex',
  flexShrink: '0',
  flexGrow: '0',

  ':not(:last-child)': {
    marginRight: '16px'
  }
})

const Link = styled('a', {
  textDecoration: 'none',
  cursor: 'pointer',
  color: "#000000"
})

const Side = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexBasis: 'auto',
  flexShrink: '0',
  flexGrow: '0'
})

const Left = styled(Side, {
  justifyContent: 'flex-start'
})
const Right = styled(Side, {
  justifyContent: 'flex-end'
})

const Logo = styled('img', {
  width: 'auto',
  height: '32px',
  verticalAlign: 'top'
})

const LogoContainer = styled('div', {
  width: 'auto',
  display: 'inline-block'
})

class MobileHeader extends PureComponent {
  render() {
    const { toggleInfo } = this.props
    return (
      <Container>
        <Level>
          <Left>
            <Item>
              <LogoContainer>
                <Logo alt="NSW Government Logo" src={logo} />
              </LogoContainer>
            </Item>
            <Item><Link href="http://myinfrastructure.planning.nsw.gov.au/"><FormattedMessage id="title" /></Link></Item>
          </Left>
          <Right>
            <Item><img onClick={toggleInfo} src={infoPath} alt="More information" /></Item>
          </Right>
        </Level>
        <MobileInfoModal />
      </Container>
    )
  }
}

export default connect(null, {
  toggleInfo
})(MobileHeader)
