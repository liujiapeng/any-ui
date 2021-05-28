import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Button, { ButtonProps } from './Button'
import '../../styles/index.scss'

export default {
  title: 'Button',
  component: Button,
} as Meta
function randomColor() {
  // 得到随机的颜色值
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r},${g},${b})`
}

const Template: Story<ButtonProps> = (args) => {
  const checkTheme = () => {
    document.documentElement.style.setProperty('--theme-primary', randomColor())
  }
  return (
    <div>
      <button type="button" onClick={checkTheme}>
        点击随机切换主题色
      </button>
      <Button {...args} />
    </div>
  )
}

export const Primary = Template.bind({})
Primary.args = {
  btnType: 'danger',
  children: '确定',
}
