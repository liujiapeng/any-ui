import React from 'react'
import classNames from 'classnames'

import { radioPrefixCls } from '../_util/config'
import List from '../List'
import RadioItem from './RadioItem'
import Icon from '../Icon'

type ItemType = {
  desc: string | (() => React.ReactElement) // 描述
  value: string | number // 值
  thumb?: string | (() => React.ReactElement) // 缩略图
  align?: 'top' | 'bottom' | 'center' // 子元素垂直对齐方式
}

export interface RadioProps {
  value: string | number
  onChangeValue?: (...args: any) => void // 点击回调
  options: Array<ItemType>
}

const wrapCls = classNames(radioPrefixCls)

const Radio: React.FC<RadioProps> = React.memo((props) => {
  const { value, onChangeValue, options = [] } = props

  return (
    <div className={wrapCls}>
      <List>
        {options.map((item) => (
          <RadioItem
            key={item.value}
            value={item.value}
            thumb={item.thumb}
            right={
              value === item.value
                ? () => <Icon size="xs" type="check" />
                : null
            }
            align={item.align}
            onClick={onChangeValue}
          >
            {item.desc}
          </RadioItem>
        ))}
      </List>
    </div>
  )
})

Radio.defaultProps = {
  value: null,
  onChangeValue: () => {},
  options: [],
}

Radio.displayName = 'Radio'

export default Radio
