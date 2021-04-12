import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import ScrollView, { IProps } from './ScrollView'
import '../../styles/index.scss'

export default {
  title: 'ScrollView',
  component: ScrollView,
} as Meta

const Template: Story<any> = (args) => (
  <div>
    <ScrollView {...args}>
      <div>你好你好</div>
      <div>你好你好</div>
      <div>你好你好</div>
      <div>你好你好</div>
      <div>你好你好</div>
      <div>你好1你好</div>
      <div>你2好你好</div>
      <div>你好3你好</div>
      <div>你5好你好</div>
      <div>你好你好</div>
      <div>你好1你好</div>
      <div>你2好你好</div>
      <div>你好3你好</div>
      <div>你5好你好</div>
      <div>你好你好</div>
      <div>你好1你好</div>
      <div>你2好你好</div>
      <div>你好3你好</div>
      <div>你2好你好</div>
      <div>你好3你好</div>
      <div>你5好你好</div>
      <div>你好你好</div>
      <div>你好1你好</div>
      <div>你2好你好</div>
      <div>你好3你好</div>
      <div>你5好你好</div>
      <div>你5好你好</div>
    </ScrollView>
  </div>
)

export const Primary = Template.bind({})

Primary.args = {
  onRefreshCb: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(0)
      }, 2000)
    }),
  pullRefreshRender: '加载中',
}
