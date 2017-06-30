import React from 'react';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl'
import Search from './'

storiesOf('Search', module)
  .addDecorator(story => <IntlProvider locale="en" messages={{}}>{story()}</IntlProvider>)
  .add('default', () => (
    <Search />
  ))
