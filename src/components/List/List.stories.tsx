import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import List, { ListProps } from './List'
import ListItem from './ListItem'
import Icon from '../Icon'
import '../../styles/index.scss'

export default {
  title: 'List',
  component: List,
} as Meta

const Template: Story<ListProps> = (args) => (
  <List {...args}>
    <ListItem
      value={1}
      align="center"
      thumb="http://www.ruanyifeng.com/blogimg/asset/201206/bg2012061901.jpg"
      right={() => <Icon type="right" />}
    >
      <div style={{ fontSize: '16px' }}>rose</div>
      <div style={{ color: 'gray', fontSize: '12px' }}>
        dont make pipe dream
      </div>
    </ListItem>
    <ListItem
      value={2}
      thumb="http://www.ruanyifeng.com/blogimg/asset/201206/bg2012061901.jpg"
      right={() => <Icon type="right" />}
    >
      <div>list item 1</div>
    </ListItem>
  </List>
)

export const Primary = Template.bind({})

Primary.args = {
  headRender: () => (
    <div style={{ color: 'gray', fontSize: '16px' }}>header</div>
  ),
  footRender: () => (
    <div style={{ color: 'gray', fontSize: '16px' }}>footer</div>
  ),
}
