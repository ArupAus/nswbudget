import React from 'react'
import { storiesOf, action } from '@storybook/react'
import { IntlProvider } from 'react-intl'
import ListTitle from './'
import { PROJECT_CATEGORY } from '../../const'

const messages = {
  title: 'Mapping the NSW Budget 2017-18',
  treasuryLink: 'Back to NSW Treasury'
}

storiesOf("ListTitle", module)
  .addDecorator(story => (
    <IntlProvider
      locale="en"
      messages={messages}
    >
      {story()}
    </IntlProvider>
  ))
  .add('noplace nocat', () => (
    <ListTitle count={12} place={null} category={null} onClearPlace={action('clear place')} onClearCategory={action('clear cat')} />
  ))
  .add('place nocat', () => (
    <ListTitle count={12} place={"Camden"} category={null} onClearPlace={action('clear place')} onClearCategory={action('clear cat')} />
  ))
  .add('cat noplace', () => (
    <ListTitle count={12} place={null} category={PROJECT_CATEGORY.UTILITIES} onClearPlace={action('clear place')} onClearCategory={action('clear cat')} />
  ))
  .add('place and cat', () => (
    <ListTitle count={12} place={"Camden"} category={PROJECT_CATEGORY.UTILITIES} onClearPlace={action('clear place')} onClearCategory={action('clear cat')} />
  ))
