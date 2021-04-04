import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Popup, { IProps } from './Popup'
import '../../styles/index.scss'

export default {
  title: 'Popup',
  component: Popup,
} as Meta

const demoStyle = {
  // height: '100px',
}

const DemoContent: React.FC = () => (
  <div>
    <h1>That is some content in here</h1>
    <p>
      declare keyword is usually used in type definitions to describe existing
      classes or variables that are defined externally in JavaScript code.
    </p>
  </div>
)
const Template: Story<IProps> = (args) => (
  <div>
    <Popup {...args}>
      <div style={demoStyle}>
        <DemoContent />
      </div>
    </Popup>
  </div>
)

const Template2: Story<Omit<IProps, 'show'>> = (args) => {
  const [show, setShow] = useState(false)
  return (
    <div>
      <button type="button" onClick={() => setShow(true)}>
        展示
      </button>
      <Popup
        {...args}
        show={show}
        onClickMask={() => setShow(false)}
        onOpen={() => console.log('打开')}
        onClose={() => console.log('关闭')}
      >
        <div style={demoStyle}>
          <DemoContent />
        </div>
      </Popup>
    </div>
  )
}

export const Primary = Template.bind({})
export const Handmake = Template2.bind({})

Primary.args = {
  show: true,
  direction: 'bottom',
  mask: true,
}

Handmake.args = {
  direction: 'bottom',
  mask: true,
}
