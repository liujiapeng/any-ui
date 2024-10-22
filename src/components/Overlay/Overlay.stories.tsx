import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Overlay, { IProps } from './Overlay'
import '../../styles/index.scss'

export default {
  title: 'Overlay',
  component: Overlay,
} as Meta

const Template: Story<IProps> = (args) => (
  <div>
    <Overlay {...args} />
  </div>
)

export const Primary = Template.bind({})

Primary.args = {
  show: true,
}
