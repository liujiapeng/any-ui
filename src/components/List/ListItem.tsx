import React from 'react'
import classNames from 'classnames'
import { listItemPrefixCls } from '../_util/config'

export interface ListItemProps {
  value: number | string // ListItem唯一标识
  thumb?: string | (() => React.ReactElement) // 缩略图
  right?: string | (() => React.ReactElement) // 列表项最右边的展示
  align?: 'top' | 'bottom' | 'center' // 子元素垂直对齐方式
  onClick?: (...args: any) => void // 点击回调
}

// au-list-item
const wrapCls = classNames(`${listItemPrefixCls}`)

// au-list-item-left 左边
const leftCls = classNames(`${listItemPrefixCls}-left`)

// au-list-item-thumb 缩略图
const thumbStyle = classNames(`${listItemPrefixCls}-left-thumb`)

// au-list-item-children 中间自定义
const childrenCls = classNames(`${listItemPrefixCls}-left-children`)

// au-list-item-right 右边
const rightCls = classNames(`${listItemPrefixCls}-right`)

const ListItem: React.FC<ListItemProps> = React.memo((props) => {
  console.log('item render')
  const { thumb, onClick, align = 'center', right, value } = props

  return (
    <div
      className={wrapCls}
      onClick={() => onClick(value)}
      style={{ alignItems: align }}
    >
      {/* 左边 */}
      <div className={leftCls} style={{ alignItems: align }}>
        {/* 缩略图 */}
        {thumb ? (
          <div className={thumbStyle}>
            {typeof thumb === 'string' ? <img alt="" src={thumb} /> : thumb()}
          </div>
        ) : null}
        {/* 中间自定义 */}
        <div className={childrenCls}>{props.children}</div>
      </div>

      {/* 右边 */}
      {right ? (
        <div className={rightCls}>
          {typeof right === 'string' ? <img alt="" src={right} /> : right()}
        </div>
      ) : null}
    </div>
  )
})

ListItem.defaultProps = {
  thumb: null,
  right: null,
  align: 'center',
  onClick: () => {},
}

ListItem.displayName = 'ListItem'

export default ListItem
