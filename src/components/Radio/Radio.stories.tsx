import React, { useCallback, useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Radio, { RadioProps } from './Radio'
import '../../styles/index.scss'

export default {
  title: 'Radio',
  component: Radio,
} as Meta

const Template: Story<RadioProps> = (args) => {
  const [value, setValue] = useState('1011')
  const onChangeValue = useCallback((v) => {
    setValue(v)
  }, [])
  return (
    <Radio
      value={value}
      onChangeValue={onChangeValue}
      options={[
        {
          thumb:
            'http://www.ruanyifeng.com/blogimg/asset/201206/bg2012061901.jpg',
          desc: '微信支付',
          value: '1011',
        },
        {
          thumb:
            'http://www.ruanyifeng.com/blogimg/asset/201206/bg2012061901.jpg',
          desc: '支付宝支付',
          value: '1022',
        },

        {
          thumb:
            'http://www.ruanyifeng.com/blogimg/asset/201206/bg2012061901.jpg',
          desc: '美团支付',
          value: '1023',
        },
        {
          thumb:
            'http://www.ruanyifeng.com/blogimg/asset/201206/bg2012061901.jpg',
          desc: '银行卡支付',
          value: '102',
        },
      ]}
    ></Radio>
  )
}

export const Primary = Template.bind({})
