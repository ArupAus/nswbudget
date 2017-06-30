import React from 'react'
import { storiesOf } from '@storybook/react'
import DataTable from './'

storiesOf("DataTable", module)
  .add('default', () => (
    <DataTable
      projects={[
        {},
        {}
      ]}
    />
  ))
