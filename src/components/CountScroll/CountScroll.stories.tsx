import React, { useCallback, useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import CountScroll from './CountScroll'
import '../../styles/index.scss'

export default {
  title: 'CountScroll',
  component: CountScroll,
} as Meta

const Template: Story<any> = (args) => {
  const [nums, setNums] = useState('1234.22')
  const getRandom = useCallback(() => {
    const n = Math.random() * (100000 - 100) + 100
    return n.toFixed(2).toString()
  }, [])
  return (
    <div>
      <CountScroll {...args} nums={nums} />
      <button type="button" onClick={() => setNums(getRandom())}>
        buton
      </button>
    </div>
  )
}

export const Primary = Template.bind({})

Primary.args = {
  nums: '1234',
}
