import React, { Component } from 'react'
import { styled } from 'styletron-react'
import { FormattedMessage } from 'react-intl'

import MobileHeader from '../MobileHeader'
import MobileFilters from '../MobileFilters'
import ListTitle from '../ListTitle'
import Toggle from '../Toggle'
// import Sort from '../Sort'
import SearchFilter from '../SearchFilter'
import List from '../List'
import ProjectModal from '../ProjectModal'

const Message = styled('div', {
  fontSize: '12px',
  marginBottom: '8px'
})
const Padded = styled('div', {
  paddingLeft: '16px',
  paddingRight: '16px'
})

export class Mobile extends Component {
  render() {
    return (
      <div>
        <MobileHeader />
        <MobileFilters />
        <Padded>
          <ListTitle />
          <Toggle />
          {/* <Sort /> */}
          <SearchFilter />
          <Message>
            <FormattedMessage id="instruction" />
          </Message>
          <List />
        </Padded>
        <ProjectModal />
      </div>
    )
  }
}

export default Mobile
