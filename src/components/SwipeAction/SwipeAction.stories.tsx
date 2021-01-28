import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SwipeAction, { SwipeActionProps } from "./SwipeAction";
import "../../styles/index.scss";

export default {
  title: "SwipeAction",
  component: SwipeAction,
} as Meta;

// const Template: Story<ButtonProps> = (args) => <Button {...args} />;
const Template: Story<SwipeActionProps> = (args: any) => {
  console.log(args);
  return <SwipeAction {...args} />;
};
export const Primary = Template.bind({});
Primary.args = {
  children: <div style={{ width: "500px", height: "100px", background: "blue" }}></div>,
  right: [
    {
      text: "Cancel",
      onPress: (index: string) => console.log("cancel" + index),
      style: { backgroundColor: "#ddd", color: "white" },
    },
    {
      text: "Delete",
      onPress: (index) => console.log("delete" + index),
      style: { backgroundColor: "#F4333C", color: "white" },
    },
  ],
};
