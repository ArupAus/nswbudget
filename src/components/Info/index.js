import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { styled } from 'styletron-react'
import logo from '../../../images/logo.png'
import closeIcon from '../../../images/nav/close.svg'

const Container = styled('div', {
  padding: '16px'
})


const Level = styled('div', {
  position: 'relative',
  fontSize: '18px',
  fontFamily: 'sans-serif',
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',
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

const InfoCloseIcon = styled('div', {
  position: 'absolute',
  right: '-6px',
  top: '-6px',
  cursor: 'pointer',
  width: '24px',
  height: 'auto',
  verticalAlign: 'top'
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

const Logo = styled('img', {
  width: '45px',
  height: 'auto',
  verticalAlign: 'top'
})

const LogoContainer = styled('div', {
  width: 'auto',
  display: 'inline-block'
})

const H4 = styled('h4', {
  marginTop: '12px'
})

const Attr = styled('div', {
  textDecoration: 'none',
  color: '#666'
})

const Link = styled('a', {
  textDecoration: 'none',
  color: '#666',
  fontSize: '12px',
  display: 'block'
})

const DataLink = styled('a', {
  marginBottom: '1em',
  lineHeight: '1.4',
  textDecoration: 'none',
  color: '#000',
  fontWeight: 'bold'
})

const Paragraph = styled('p', {
  marginBottom: '1em',
  lineHeight: '1.4'
})

export class Info extends Component {
  render() {
    const { isOpen, onRequestClose } = this.props
    return (
      <Container>
        <Level>
          <Left>
            <Item>
              <LogoContainer>
                <Logo src={logo} alt="NSW Government Logo" />
              </LogoContainer>
            </Item>
            <Item><FormattedMessage id="title" /></Item>
            <InfoCloseIcon onClick={() => onRequestClose(isOpen)}>
              <img src={closeIcon} alt="close" />
            </InfoCloseIcon>
          </Left>
        </Level>
        <Paragraph>The 2017-18 Budget continues the record program with capital spend of $72.7 billion in the four years to 2020-21. The Government’s commitment in 2017-18 is $22.3 billion. This includes major infrastructure projects and programs to realise opportunities for economic growth and provide for our local communities.</Paragraph>
        <Paragraph>Mapping the Budget highlights the key areas of spend. You can use the map to explore projects across planning regions and Local Government Areas (LGA), or filter by agency and project type. This website is an initiative of the NSW Government and has been developed by the Department of Planning and Environment and NSW Treasury.</Paragraph>
        <H4>Data Disclaimer</H4>
        <Paragraph>The project details in this mapping tool are the major works as listed in NSW Treasury 2017-18 Budget Paper 2 ‘Infrastructure Statement’ as published on 20 June 2017. A number of projects do not include Estimated Total Cost (ETC). Where shown, the notation “n.a.” means either data is not available or not disclosed due to commercial sensitivity.</Paragraph>
        <Paragraph>The State total in the mapping tool may not match that published in the Budget Papers. The difference includes minor works programs and inter-sector purchases. In collating the Budget Paper, NSW Treasury requests certain information from the delivery agencies including a project location. The location provided by the delivery agencies has informed the location you see on the map and best efforts have been made to verify each project location but, in some cases, the projects may not be located correctly.</Paragraph>
        <Paragraph>The data is available from <DataLink href="https://data.nsw.gov.au/data/dataset/nsw-budget-paper-2" target="_blank">data.nsw.gov.au</DataLink></Paragraph>
        <Paragraph>The Department of Planning and Environment will continue to work with the agencies involved to verify each project location for accuracy.</Paragraph>
        <br />
        <Attr>
          <Link href="https://www.mapbox.com/feedback/">Basemap tiles © Mapbox</Link>
          <Link href="http://www.openstreetmap.org/copyright">Basemap data © OpenStreetMap</Link>
          <Link href="http://www.arup.com">Visualisation | Arup</Link>
        </Attr>
      </Container>
    )
  }
}

export default Info
