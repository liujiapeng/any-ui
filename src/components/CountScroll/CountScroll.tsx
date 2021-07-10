import React, { useMemo, useRef } from 'react'

const arr = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const arrLen = arr.length

const Col: React.FC<{ val: string; height: number }> = React.memo(
  ({ val, height }) => {
    /**
     * 垂直偏移
     */
    const Y = useMemo(
      () =>
        val === '.' ? '-0%' : `-${(Number(val) + 1) * ((10 / arrLen) * 10)}%`,
      [val]
    )

    const colRef = useRef<HTMLDivElement>()

    return (
      <div className="viewport" style={{ height: `${height}px` }}>
        <div
          className="col"
          ref={colRef}
          style={{ transform: `translate3d(0px, ${Y},0px)` }}
        >
          {arr.map((cell) => (
            <div style={{ height: `${height}px` }} key={cell} className="col-i">
              {cell}
            </div>
          ))}
        </div>
      </div>
    )
  }
)

interface IProps {
  /** 数值 */
  nums: string

  /** 类名 */
  className?: string

  /** 高度 */
  height?: number
}

const CountScroll: React.FC<IProps> = ({
  nums,
  className = '',
  height = 20,
}) => {
  const arr = useMemo(
    () =>
      nums
        .toString()
        .split('')
        .map((item, i) => ({
          val: item,
          key: i,
        })),
    [nums]
  )
  return (
    <div className={`wrap ${className}`}>
      {arr.map((item) => (
        <Col height={height} key={item.key} val={item.val} />
      ))}
    </div>
  )
}

export default React.memo(CountScroll)
