import React, { useRef, useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import CircleStep, { IProps, forwardRefProps } from './CircleStep'
import '../../styles/index.scss'

export default {
  title: 'CircleStep',
  component: CircleStep,
} as Meta

const Template: Story<IProps> = (args) => {
  const cref = useRef<forwardRefProps>()
  const { auto } = args
  return (
    <div>
      <CircleStep ref={cref} {...args} />
      {!auto && (
        <button type="button" onClick={() => cref.current.excute()}>
          excute
        </button>
      )}
    </div>
  )
}

export const Primary = Template.bind({})

Primary.args = {
  auto: false,
  process: 75,
  color: 'red',
  duration: 1500,
  delay: 1500,
}
