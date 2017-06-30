import React, { Component } from 'react'
import { styled } from 'styletron-react'
import SearchIcon from '../Icons/search'

const Container = styled('div', {
  position: 'relative',
  width: '100%',
  zIndex: '3',
  display: 'inline-block'
})

const Input = styled('input', {
  border: '1px solid #9D9D9F',
  padding: '0 4px',
  fontSize: '12px',
  display: 'inline-block',
  outline: '0',
  width: '100%',
  backgroundColor: ''
})

const Icon = styled('div', {
  position: 'absolute',
  display: 'inline-block',
  right: '0',
  zIndex: '99',
  top: '50%',
  transform: 'translate(0,-50%)',
  cursor: 'pointer'
})

const InputContainer = styled('div', {
  position: 'relative',
  width: '280px'
})

class Search extends Component {
  render() {
    return (
      <Container>
        <InputContainer>
          <Input placeholder="Postcode, LGA, Region, Project name" />
          <Icon>
            <SearchIcon />
          </Icon>
        </InputContainer>
      </Container>
    )
  }
}

export default Search
