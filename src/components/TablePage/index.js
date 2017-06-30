import React, { Component } from 'react'
import { styled } from 'styletron-react'

import Header from '../Header'
import SearchFilterBar from '../SearchFilterBar'
import DataTable from '../DataTable'

const Container = styled('div', {
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%'
})

const TableBody = styled('div', {
  position: 'relative',
  width: 'calc(100%-32px)',
  maxWidth: '960px',
  margin: '0 auto',
  padding: '8px'
})

const SF = styled('div', {
  padding: '0px'
})

export class TablePage extends Component {
  render() {
    return (
      <Container>
        <Header />
        <TableBody>
          <SF><SearchFilterBar /></SF>
          <DataTable />
        </TableBody>
      </Container>
    )
  }
}

export default TablePage
