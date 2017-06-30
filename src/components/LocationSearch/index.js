import React, { Component } from 'react'
import { styled } from 'styletron-react'
import { connect } from 'react-redux'
import { setQuery, clearQuery } from '../../actions'
import LocationSearchResults from '../LocationSearchResults'
import CloseIcon from '../../../images/nav/close.svg'

const Container = styled('div', {
  marginBottom: '8px',
  width: '100%',
  color: '#666',
  fontWeight: '500',
  fontSize: '14px',
  position: 'relative',
  boxSizing: 'border-box',
  zIndex: '1',

  '@media (min-width: 600px)': {
    minWidth: '280px'
  }
})

const Input = styled('input', {
  padding: '12px 35px 12px 12px',
  width: '100%',
  color: '#666',
  fontWeight: '500',
  fontSize: '14px',
  border: '1px solid #ccc',
  background: 'white',
  boxSizing: 'border-box',
  zIndex: '1'
})

const ClearQueryButton = styled('div', {
  cursor: 'pointer',
  position: 'absolute',
  right: '9px',
  top: '9px'
})


export class LocationSearch extends Component {
  onChange = e => {
    const { onChange } = this.props
    onChange(e.target.value)
  }
  render() {
    const { query, isMobile, clear } = this.props
    const placeholderText = isMobile ? "suburb / postcode / location" : "project / suburb / postcode"
    return (
      <Container>
        <Input type="text" value={query} placeholder={placeholderText} onChange={this.onChange} />
        <ClearQueryButton onClick={clear}>
          <img src={CloseIcon} alt="close" />
        </ClearQueryButton>
        {query && <LocationSearchResults isMobile={isMobile} />}
      </Container>
    )
  }
}

export default connect(state => ({
  query: state.app.query
}), {
  onChange: setQuery,
  clear: clearQuery
})(LocationSearch)
