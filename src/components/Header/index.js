import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { styled } from 'styletron-react'
import logo from '../../../images/logo.png'
import theme from '../../theme.js'
import Nav from '../Nav'
import backIcon from '../../../images/nav/back.svg'

const Container = styled('div', {
  padding: '8px 8px',
  backgroundColor: theme.main,
  width: '100%',
  boxShadow: '0 2px 4px rgba(0,0,0,0.20)',
  position: 'relative',
  zIndex: 2
})

const Level = styled('div', {
  position: 'relative',
  fontSize: '18px',
  fontFamily: 'sans-serif',
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'space-between'
})

const Item = styled('div', {
  flexBasis: 'auto',
  display: 'flex',
  flexShrink: '0',
  flexGrow: '0',

  ':not(:last-child)': {
    marginRight: '16px'
  }
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
  width: '45px',
  height: 'auto',
  verticalAlign: 'top'
})

const LogoContainer = styled('div', {
  width: 'auto',
  display: 'inline-block'
})

const Link = styled('a', {
  textDecoration: 'none',
  cursor: 'pointer',
  color: "#000000"
})

const Back = styled('a', {
  textDecoration: 'none',
  fontSize: '12px',
  cursor: 'pointer',
  color: "#000000",
  paddingTop: '3px'
})

const BackIcon = styled('div', {
  position: 'relative',
  display: 'flex',
  marginRight: '20px',
  width: '20px',
  height: '20px',
  cursor: 'pointer',
})

// TODO: add back arrow
class Header extends Component {
  render() {
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
            <Item><Nav /></Item>
          </Left>
          <Right>
            <Item>
              <BackIcon onClick={this.toggle}>
                <img src={backIcon} alt="up" />
              </BackIcon>
              <Back href="https://budget.nsw.gov.au">
                <FormattedMessage id="treasuryLink" />
              </Back>
            </Item>
          </Right>
        </Level>
      </Container>
    )
  }
}

export default Header
