import React from 'react'
import { storiesOf } from '@storybook/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import messages from '../../messages.json'

import ProjectList from './'

function reducer(state = {}) {
  return state
}

const store = createStore(reducer)

storiesOf("ProjectList", module)
  .addDecorator(story => <IntlProvider locale="en" messages={messages}>{story()}</IntlProvider>)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('empty', () => (
    <ProjectList
      projects={[]}
      name="test"
    />
  ))
  .add('one', () => (
    <ProjectList
      projects={[{}]}
      name="one"
    />
  ))
  .add('many', () => (
    <ProjectList
      projects={[{}, {}]}
      name="one"
    />
  ))
