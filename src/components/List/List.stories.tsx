import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import List, { ListProps } from './List';
import ListItem from './ListItem';
import '../../styles/index.scss';

export default {
  title: 'List',
  component: List,
} as Meta;

const Template: Story<ListProps> = (args) => (
  <List {...args}>
    <ListItem
      value={1}
      align="center"
      thumb="http://www.ruanyifeng.com/blogimg/asset/201206/bg2012061901.jpg"
      right={() => (
        <img src="https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/2a990c2e08b69efb8e4f25e8daa290fa~300x300.image" />
      )}
    >
      <div style={{ fontSize: '16px' }}>赵露丝</div>
      <div style={{ color: 'gray', fontSize: '12px' }}>今晚出来做爱吗</div>
    </ListItem>
    <ListItem
      value={2}
      thumb="http://www.ruanyifeng.com/blogimg/asset/201206/bg2012061901.jpg"
      right={() => (
        <img src="https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/2a990c2e08b69efb8e4f25e8daa290fa~300x300.image" />
      )}
    >
      <div>list item 1</div>
    </ListItem>
  </List>
);

export const Primary = Template.bind({});
Primary.args = {
  headRender: () => (
    <div style={{ color: 'gray', fontSize: '16px' }}>header</div>
  ),
  footRender: () => (
    <div style={{ color: 'gray', fontSize: '16px' }}>footer</div>
  ),
};
