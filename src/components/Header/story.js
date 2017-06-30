import React from 'react';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl'
import Header from './'


const messages = {
  title: 'Mapping the NSW Budget',
  treasuryLink: 'Back to 2017-18 NSW Budget'
}

storiesOf('Header', module)
  .addDecorator(story => (
    <IntlProvider
      locale="en"
      messages={messages}
    >
      {story()}
    </IntlProvider>
  ))
  .add('default', () => (
    <Header />
  ))
