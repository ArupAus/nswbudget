import React from 'react'
import { storiesOf } from '@storybook/react'
import { IntlProvider } from 'react-intl'
import Sidebar from './'

storiesOf("Sidebar", module)
  .addDecorator(story => <IntlProvider locale="en" messages={{}}>{story()}</IntlProvider>)
  .add('default', () => (
    <Sidebar
      stateWideProjects={[]}
      localProjects={[]}
    />
  ))
  .add('multiple', () => (
    <Sidebar
      stateWideProjects={[{}]}
      localProjects={[{}, {}]}
    />
  ))
