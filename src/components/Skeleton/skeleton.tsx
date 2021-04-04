import React, { useMemo } from 'react'
import classNames from 'classnames'
import { skeletonPrefixCls } from '../_util/config'

const groups = [
  [3, 2, 7],
  [2, 9, 1],
  [1, 10, 1],
  [3, 8, 1],
  [7, 1, 4],
]

const groupsLen = groups.length

export interface ILoadRow {
  n: number
}
export const LoadRow: React.FC<ILoadRow> = ({ n }) => (
  <div className={`loading-row loading au-col-${n}`} />
)

export const LoadAvatar: React.FC = () => (
  <div className="loading-avatar loading" />
)

export interface IProps {
  customize: boolean // 是否用户自定义
  rows?: number // 行数
  avator?: boolean // 头像
}

const Skeleton: React.FC<IProps> = (props) => {
  const classes = classNames(`${skeletonPrefixCls}-wrap`)

  const { customize, rows = 5, avator = false, children } = props

  const arr = useMemo(() => new Array(rows).fill(1), [rows])

  return (
    <div className={classes}>
      {customize ? (
        children
      ) : (
        <div className="skeleton-default">
          {avator && <LoadAvatar />}
          <div style={{ flex: 1 }}>
            {arr.map((_, index) => (
              <div key={Math.random()} className="au-col">
                <LoadRow n={groups[index % groupsLen][0]} />
                <LoadRow n={groups[index % groupsLen][1]} />
                <LoadRow n={groups[index % groupsLen][2]} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Skeleton
