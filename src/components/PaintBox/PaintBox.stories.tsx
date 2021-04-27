import React, { useRef } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import PaintBox, { IProps } from './PaintBox'
import '../../styles/index.scss'

export default {
  title: 'PaintBox',
  component: PaintBox,
} as Meta

const Template: Story<IProps> = (args) => {
  const r = useRef(null)
  return (
    <div>
      <PaintBox ref={r} {...args} />
      <button type="button" onClick={() => r.current.reset()}>
        清空
      </button>
    </div>
  )
}

export const Primary = Template.bind({})
