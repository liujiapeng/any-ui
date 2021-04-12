import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import ScrollView from './ScrollView'
import '../../styles/index.scss'

export default {
  title: 'ScrollView',
  component: ScrollView,
} as Meta

const Template: Story<any> = (args) => (
  <div>
    <ScrollView {...args} />
  </div>
)

export const Primary = Template.bind({})

Primary.args = {}
