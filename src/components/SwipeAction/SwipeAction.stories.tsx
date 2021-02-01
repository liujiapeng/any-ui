import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import SwipeAction, { SwipeActionProps } from './SwipeAction';
import List, { ListItem } from '../List';
import Icon from '../Icon';
import '../../styles/index.scss';

export default {
  title: 'SwipeAction',
  component: SwipeAction,
} as Meta;

// const Template: Story<ButtonProps> = (args) => <Button {...args} />;
const Template: Story<SwipeActionProps> = (args: any) => {
  return (
    <List>
      {[1, 2, 3].map((k, i) => (
        <SwipeAction key={i} {...args} />
      ))}
    </List>
  );
};
export const Primary = Template.bind({});
Primary.args = {
  children: (
    <ListItem
      value={1}
      align="center"
      thumb="http://www.ruanyifeng.com/blogimg/asset/201206/bg2012061901.jpg"
      right={() => <Icon type="right"></Icon>}
    >
      <div style={{ fontSize: '16px' }}>rose</div>
      <div style={{ color: 'gray', fontSize: '12px' }}>
        dont make pipe dream
      </div>
    </ListItem>
  ),
  right: [
    {
      text: 'Cancel',
      onPress: (index: string) => console.log('cancel' + index),
      style: { backgroundColor: '#ddd', color: 'white' },
    },
    {
      text: 'Delete',
      onPress: (index) => console.log('delete' + index),
      style: { backgroundColor: '#F4333C', color: 'white' },
    },
  ],
};
