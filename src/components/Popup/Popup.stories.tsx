import React, { useRef, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Popup, { IProps } from './Popup';
import '../../styles/index.scss';

export default {
  title: 'Popup',
  component: Popup,
} as Meta;

const Template: Story<IProps> = (args) => {
  return (
    <div>
      <Popup {...args}>
        <div style={{ height: '100px', background: 'red' }}></div>
      </Popup>
    </div>
  );
};

const Template2: Story<Omit<IProps, 'show'>> = (args) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>展示</button>
      <Popup
        {...args}
        show={show}
        onClickMask={() => setShow(false)}
        onOpen={() => alert('打开')}
        onClose={() => alert('关闭')}
      >
        <div style={{ height: '100px', background: 'red' }}></div>
      </Popup>
    </div>
  );
};

export const Primary = Template.bind({});
export const Handmake = Template2.bind({});

Primary.args = {
  show: true,
  direction: 'bottom',
  mask: true,
};

Handmake.args = {
  direction: 'bottom',
  mask: true,
};
