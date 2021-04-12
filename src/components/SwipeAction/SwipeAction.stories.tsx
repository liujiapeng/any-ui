import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import SwipeAction, { SwipeActionProps } from './SwipeAction'
import List, { ListItem } from '../List'
import Icon from '../Icon'
import '../../styles/index.scss'

export default {
  title: 'SwipeAction',
  component: SwipeAction,
} as Meta

// const Template: Story<ButtonProps> = (args) => <Button {...args} />;
const Template: Story<SwipeActionProps> = () => {
  const [options, setOptions] = useState([
    { name: 'jenson' },
    { name: 'rick' },
    { name: 'hansome' },
  ])
  return (
    <List>
      {options.map((k, i) => (
        <SwipeAction
          autoClose
          key={k.name}
          index={i}
          disabled={false}
          onOpen={() => {}}
          onClose={() => {}}
          right={[
            {
              text: 'Cancel',
              onPress: (index: string) => console.log(`cancel${index}`),
              style: { backgroundColor: '#ddd', color: 'white' },
            },
            {
              text: 'Delete',
              onPress: (index) => {
                const t = [...options]
                t.splice(index, 1)
                setOptions(t)
              },
              style: { backgroundColor: '#F4333C', color: 'white' },
            },
          ]}
        >
          {' '}
          <ListItem
            value={1}
            align="center"
            thumb="http://www.ruanyifeng.com/blogimg/asset/201206/bg2012061901.jpg"
            right={() => <Icon type="right" />}
          >
            <div style={{ fontSize: '16px' }}>{k.name}</div>
            <div style={{ color: 'gray', fontSize: '12px' }}>
              dont make pipe dream
            </div>
          </ListItem>
        </SwipeAction>
      ))}
    </List>
  )
}
export const Primary = Template.bind({})
