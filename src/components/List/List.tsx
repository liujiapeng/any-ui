import React from 'react'
import classNames from 'classnames'

import Item from './ListItem'

import { listPrefixCls } from '../_util/config'

export interface ListProps {
  headRender?: () => React.ReactElement // 头部
  footRender?: () => React.ReactElement // 底部
}

const wrapCls = classNames(listPrefixCls)
const bodyCls = classNames(`${listPrefixCls}-body`)
const headCls = classNames(`${listPrefixCls}-head`)
const footCls = classNames(`${listPrefixCls}-foot`)

const List: React.FC<ListProps> = React.memo((props) => {
  const { headRender, footRender } = props
  return (
    <div className={wrapCls}>
      {/* 头部 */}
      {typeof headRender === 'function' && (
        <div className={headCls}>{headRender()}</div>
      )}

      {/* 列表体 */}
      <div className={bodyCls}>{props.children}</div>

      {/* 底部 */}
      {typeof footRender === 'function' && (
        <div className={footCls}>{footRender()}</div>
      )}
    </div>
  )
})

List.displayName = 'List'

List.defaultProps = {
  headRender: null,
  footRender: null,
}

export default List
