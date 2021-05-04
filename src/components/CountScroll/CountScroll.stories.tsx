import React, { useRef } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import CountScroll from './CountScroll'
import '../../styles/index.scss'

export default {
  title: 'CountScroll',
  component: CountScroll,
} as Meta

const Template: Story<any> = (args) => <CountScroll {...args} />

export const Primary = Template.bind({})

Primary.args = {
  nums: 1234,
}
