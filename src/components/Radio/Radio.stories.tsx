import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Radio, { RadioProps } from './Radio';
import '../../styles/index.scss';

export default {
  title: 'Radio',
  component: Radio,
} as Meta;

const Template: Story<RadioProps> = (args) => {
  const [value, setValue] = useState('1011');
  return (
    <Radio
      value={value}
      onChangeValue={(v) => setValue(v)}
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
      ]}
    ></Radio>
  );
};

export const Primary = Template.bind({});
