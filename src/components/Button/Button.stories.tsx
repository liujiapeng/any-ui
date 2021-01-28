import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button , { ButtonProps } from './Button';
import "../../styles/index.scss";

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  btnType: 'danger',
  children: "确定"
};
