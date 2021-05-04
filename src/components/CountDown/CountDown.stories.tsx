import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import CountDown, { IProps } from './CountDown'
import '../../styles/index.scss'

export default {
  title: 'CountDown',
  component: CountDown,
} as Meta

const Template: Story<IProps> = (args) => (
  <CountDown endText="结束" endTime="2021-05-04 23:20:10">
    {({ d, h, m, s }) => (
      <div>
        {d}天{h}小时{m}分钟{s}秒
      </div>
    )}
  </CountDown>
)

export const Primary = Template.bind({})
