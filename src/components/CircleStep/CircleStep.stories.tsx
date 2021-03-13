import React, { useRef, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import CircleStep, { IProps } from './CircleStep';
import '../../styles/index.scss';

export default {
  title: 'CircleStep',
  component: CircleStep,
} as Meta;

const Template: Story<IProps> = (args) => {
  const cref = useRef<null>();
  return (
    <div>
      <CircleStep
        ref={cref}
        auto={true}
        process={75}
        color="red"
        duration={1500}
        delay={1500}
      ></CircleStep>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
