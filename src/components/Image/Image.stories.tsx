import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import '../../styles/index.scss'
import Image, { IProps } from './image'

export default {
  title: 'Image',
  component: Image,
} as Meta

const Template: Story<IProps> = (args) => <Image className="img" {...args} />

export const Primary = Template.bind({})

Primary.args = {
  src:
    'https://ljbcdn.tsbxdl.com/insurance200/M00/ex/20210402143248-a72a6999-3504-4ac3-9884-77298db796c8.png',
  height: 411,
  width: 200,
  isPlaceHolder: true,
  placeHolder: '#ff8738',
}
