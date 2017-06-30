import React, { Component } from 'react'
import { styled } from 'styletron-react'

import Header from '../Header'
import Map from '../Map'
import Sidebar from '../Sidebar'
import SearchFilterBar from '../SearchFilterBar'
import ZoomControl from '../ZoomControl'
import RefreshControl from '../RefreshControl'

const Container = styled('div', {
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%'
})

const Body = styled('div', {
  position: 'relative',
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
})

const Inner = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column'
})

const SF = styled('div', {
  width: '100%',
  zIndex: 1,
})

const ZoomContainer = styled('div', {
  zIndex: '2',
  position: 'absolute',
  right: '320px',
  bottom: '20px',
})

const RefreshContainer = styled('div', {
  zIndex: '3',
  position: 'absolute',
  right: '320px',
  bottom: '70px',
})

export class MapPage extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Body>
          <Map />
          <RefreshContainer>
            <RefreshControl />
          </RefreshContainer>
          <ZoomContainer>
            <ZoomControl />
          </ZoomContainer>
          <Inner>
            <SF><SearchFilterBar /></SF>
            <Body>
              <Sidebar />
            </Body>
          </Inner>
        </Body>
      </Container>
    )
  }
}

export default MapPage
