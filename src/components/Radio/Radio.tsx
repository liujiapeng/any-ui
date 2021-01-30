import React from 'react';
import classNames from 'classnames';

import { radioPrefixCls } from '../_util/config';
import List, { ListItem } from '../List';
import Icon from '../Icon';
type ItemType = {
	desc: string | (() => React.ReactElement); // 描述
	value: string | number; // 值
	thumb?: string | (() => React.ReactElement); // 缩略图
	align?: 'top' | 'bottom' | 'center'; // 子元素垂直对齐方式
};

export interface RadioProps {
	value: string | number;
	onChangeValue?: (...args: any) => void; // 点击回调
	options: Array<ItemType>;
}

const wrapCls = classNames(radioPrefixCls);
const radioItemCls = classNames(`${radioPrefixCls}-item`);

const Radio: React.FC<RadioProps> = (props) => {
	const { value, onChangeValue, options = [] } = props;
	return (
		<div className={wrapCls}>
			<List>
				{options.map((item, index) => (
					<div className={radioItemCls} key={index}>
						<ListItem
							value={item.value}
							thumb={item.thumb}
							right={
								value === item.value ? () => <Icon size="xs" type={'check'} /> : null
							}
							align={item.align}
							onClick={(value) => onChangeValue(value)}
						>
							{item.desc}
						</ListItem>
					</div>
				))}
			</List>
		</div>
	);
};

Radio.defaultProps = {
	value: null,
	onChangeValue: () => {},
	options: [],
};

export default Radio;
