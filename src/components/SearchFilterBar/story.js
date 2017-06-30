import React from 'react';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl'

import SearchFilterBar from './'

const messages = {
  search_label: "Search for a project or location",
  filter_label: "Select a project type",
}

storiesOf('SearchFilterBar', module)
  .addDecorator(story => <IntlProvider locale="en" messages={messages}>{story()}</IntlProvider>)
  .add('default', () => (
    <SearchFilterBar />
  ))
