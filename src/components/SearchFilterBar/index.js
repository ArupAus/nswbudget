import React, { Component } from 'react'
import { styled } from 'styletron-react'
import LocationSearch from '../LocationSearch'
import Filter from '../Filter'
import LabelledField from '../LabelledField'

const Container = styled('div', {
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  zIndex: '2',
  padding: '8px',
  position: 'relative',
  display: 'flex',
  ':after': {
    display: 'table',
    content: "''",
    clear: 'both'
  },
  justifyContent: 'center'
})

const Item = styled('div', {
  display: 'inline-block',
  float: 'left',
  position: 'relative',
  marginLeft: '16px'
})

class SearchFilterBar extends Component {
  render() {
    return (
      <Container>
        <Item>
          <LabelledField label="search_label">
            <LocationSearch />
          </LabelledField>
        </Item>
        <Item>
          <LabelledField label="filter_label">
            <Filter />
          </LabelledField>
        </Item>
      </Container>
    )
  }
}

export default SearchFilterBar
