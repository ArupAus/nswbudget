import React from 'react'
import { storiesOf, action } from '@storybook/react'
import Filter from './'
import { PROJECT_CATEGORY } from '../../const'

storiesOf("Filter", module)
  .add('default', () => (
    <Filter onClick={action('click tile')} />
  ))
  .add('selected', () => (
    <Filter selected={PROJECT_CATEGORY.UTILITIES} onClick={action('click tile')} />
  ))
