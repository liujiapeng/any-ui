import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import '../../styles/index.scss'
import Skeleton, { IProps } from './skeleton'

export default {
  title: 'Skeleton',
  component: Skeleton,
} as Meta

const Template: Story<IProps> = (args) => (
  <div>
    <Skeleton {...args} />
    <br />
    <Skeleton {...args} />
  </div>
)

export const Primary = Template.bind({})

Primary.args = {
  customize: false, // 是否用户自定义
  rows: 4, // 行数
  avator: false, // 头像
}
