import React from 'react'
import { storiesOf, action } from '@storybook/react'
import FilterButton from './'

storiesOf("FilterButton", module)
  .add('default', () => (
    <FilterButton name="test" onClose={action('close')} />
  ))
