import React from 'react'
import { storiesOf } from '@storybook/react'
import { IntlProvider } from 'react-intl'
import LabelledField from './'

const messages = {
  test: 'This is a nice label'
}

storiesOf("LabelledField", module)
  .addDecorator(story => (
    <IntlProvider messages={messages} locale="en">
      {story()}
    </IntlProvider>
  ))
  .add('default', () => (
    <LabelledField label="test" forId="this">
      child
    </LabelledField>
  ))
