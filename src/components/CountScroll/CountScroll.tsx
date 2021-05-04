import React, { useEffect, useMemo, useRef, useState } from 'react'

const Col: React.FC<{ num: number }> = React.memo(({ num }) => {
  const arr = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [])
  const top = useMemo(() => ` -${num * 100}%`, [num])
  const colRef = useRef<HTMLDivElement>()
  const [viewportHeight, setviewportHeight] = useState(0)
  useEffect(() => {
    const height = colRef.current.clientHeight / arr.length
    setviewportHeight(height)
  }, [arr.length])
  return (
    <div className="viewport" style={{ height: viewportHeight }}>
      <div className="col" ref={colRef} style={{ top }}>
        {arr.map((i) => (
          <div key={i} className="col-i">
            {i}
          </div>
        ))}
      </div>
    </div>
  )
})

const CountScroll: React.FC<{ nums: number; className: string }> = ({
  nums,
  className,
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
        <Col key={item.key} num={Number(item.val)} />
      ))}
    </div>
  )
}

export default React.memo(CountScroll)
