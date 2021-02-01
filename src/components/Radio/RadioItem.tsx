import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { ListItem } from '../List';
import { radioPrefixCls } from '../_util/config';

export interface RadioItemProps {
  value: number | string; // ListItem唯一标识
  thumb?: string | (() => React.ReactElement); // 缩略图
  right?: string | (() => React.ReactElement); // 列表项最右边的展示
  align?: 'top' | 'bottom' | 'center'; // 子元素垂直对齐方式
  onClick?: (...args: any) => void; // 点击回调
}

// au-list-item
const radioItemWrapCls = classNames(`${radioPrefixCls}-item`);

const RadioItem: React.FC<RadioItemProps> = React.memo((props) => {
  console.log('radio item render');
  return (
    <div className={radioItemWrapCls}>
      <ListItem {...props}></ListItem>
    </div>
  );
});

RadioItem.defaultProps = {
  value: '',
  thumb: null,
  right: null,
  align: 'center',
  onClick: () => {},
};

export default RadioItem;
