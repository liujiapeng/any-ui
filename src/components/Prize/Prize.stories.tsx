import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Prize, { IProps } from './Prize'

export default {
  title: 'Prize',
  component: Prize,
} as Meta

const Template: Story<IProps> = (args) => <Prize {...args} />

export const Primary = Template.bind({})
Primary.args = {
  resultIndex: 3,
  format: [
    [1, 2],
    [3, 4],
    [5, -1],
  ],
}
