import React, { useEffect, useRef } from 'react'

export interface IProps {
  pullRefreshRender: React.ReactNode
  onRefreshCb: () => Promise<any>
}

const touchParams = {
  canTouch: true,
  startY: 0, // 开始坐标
  preTouchS: 0, // 上一次坐标
}
const ScrollView: React.FC<IProps> = (props) => {
  const { pullRefreshRender, onRefreshCb, children } = props
  const wrapRef = useRef<HTMLDivElement>()
  const refreshContentRef = useRef<HTMLDivElement>()
  const directionRef = useRef<string>('')

  const getTop = (dom: HTMLElement) => parseInt(dom.style.top, 10)

  useEffect(() => {
    const dom = wrapRef.current
    dom.addEventListener('touchstart', (e) => {
      touchParams.startY = e.touches[0].pageY
    })
    dom.addEventListener('touchend', () => {
      const direction = directionRef.current
      touchParams.canTouch = false
      if (direction === 'down') {
        onRefreshCb().then(() => {
          dom.style.top = '0px'
          touchParams.canTouch = true
        })
      } else if (direction === 'up') {
        dom.style.top = '0px'
        touchParams.canTouch = true
      } else {
        touchParams.canTouch = true
      }
    })
    dom.addEventListener('touchmove', (e) => {
      const { scrollTop } = dom

      if (scrollTop !== 0 || !touchParams.canTouch) {
        return
      }
      const currentY = e.touches[0].pageY
      const { startY, preTouchS } = touchParams

      const touchS = currentY - startY

      console.log(touchS)

      if (touchS - preTouchS > 0) {
        directionRef.current = 'down'
      } else {
        directionRef.current = 'up'
      }

      const refreshContentHeight = refreshContentRef.current.clientHeight

      if (getTop(dom) < 0 || getTop(dom) > refreshContentHeight) {
        return
      }

      const s = touchS > refreshContentHeight ? refreshContentHeight : touchS // 避免大幅度的滑动

      dom.style.top = `${s}px`

      touchParams.preTouchS = touchS
    })
  }, [onRefreshCb])
  return (
    <div className="au-scroll-container">
      <div
        style={{ top: 0, height: '300px' }}
        ref={wrapRef}
        className="au-scroll-view"
      >
        {children}
      </div>
      <div ref={refreshContentRef} className="refresh-content">
        {pullRefreshRender}
      </div>
    </div>
  )
}

export default ScrollView
