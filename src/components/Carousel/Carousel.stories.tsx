import React, { useRef } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Carousel, { IProps } from './Carousel'
import '../../styles/index.scss'

export default {
  title: 'Carousel',
  component: Carousel,
} as Meta

const Template: Story<IProps> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Carousel {...args} />
  </div>
)

export const Primary = Template.bind({})

Primary.args = {
  imgList: [
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  ],
  showArray: true,
  showPoints: true,
  autoPlay: true,
  during: 2000,
}
