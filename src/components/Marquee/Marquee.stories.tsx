import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Marquee, { MarqueeProps } from './Marquee'
import '../../styles/index.scss'

export default {
  title: 'Marquee',
  component: Marquee,
} as Meta

const Template: Story<MarqueeProps> = (args) => (
  <>
    <Marquee
      duration={2}
      direction="horizontal"
      content={<p>你好你好你好你好</p>}
    />
    <div style={{ height: '200px' }}>
      <Marquee
        duration={2}
        direction="vertical"
        content={
          <div>
            <p>你好你好你好你好1</p>
            <p>你好你好你好你好2</p>
            <p>你好你好你好你好3</p>
            <p>你好你好你好你好4</p>
          </div>
        }
      />
    </div>
  </>
)

export const Primary = Template.bind({})
