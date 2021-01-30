import classnames from 'classnames';
import React, { useEffect } from 'react';
import loadSprite from './loadSprite';

import { Omit } from '../_util/types';

export interface IconPropsType {
	type: string;
	color?: string;
}

export type SvgProps = Omit<React.HTMLProps<SVGSVGElement>, 'size' | 'type'>;

export interface IconProps extends IconPropsType, SvgProps {
	size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
	onClick?: React.MouseEventHandler<SVGSVGElement>;
}

const Icon: React.FC<IconProps> = (props) => {
	useEffect(() => {
		loadSprite();
	}, []);
	const { type, className, size, ...restProps } = props;
	const cls = classnames(
		className,
		'au-icon',
		`au-icon-${type}`,
		`au-icon-${size}`
	);
	return (
		<svg className={cls} {...(restProps as any)}>
			<use xlinkHref={`#${type}`} />
		</svg>
	);
};
Icon.defaultProps = {
	size: 'md',
};

export default Icon;
