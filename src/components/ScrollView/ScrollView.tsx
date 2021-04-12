import React, { useEffect, useRef } from 'react'

const f = 0
let g = 0
const touchParams = {
  startY: 0,
  currentY: 0,
}
const ScrollView: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>()

  const getTop = (dom: HTMLElement) => parseInt(dom.style.top, 10)

  useEffect(() => {
    const dom = wrapRef.current
    dom.addEventListener('touchstart', (e) => {
      g = 1
      touchParams.startY = e.touches[0].pageY
      console.log(e.touches[0].pageY)
    })
    dom.addEventListener('touchend', () => {
      g = 0
    })
    dom.addEventListener('touchmove', (e) => {
      console.log(e.touches[0].pageY)
    })
  }, [])
  return (
    <>
      <div style={{ top: 0 }} ref={wrapRef} className="au-scroll-view">
        <h1>你好你好</h1>
        <h1>你好你好</h1>
        <h1>你好你好</h1>
        <h1>你好你好</h1>
        <h1>你好你好</h1>
        <h1>你好1你好</h1>
        <h1>你2好你好</h1>
        <h1>你好3你好</h1>
        <h1>你5好你好</h1>
        <h1>你好你好</h1>
        <h1>你好1你好</h1>
        <h1>你2好你好</h1>
        <h1>你好3你好</h1>
        <h1>你5好你好</h1>
      </div>
    </>
  )
}

export default ScrollView
