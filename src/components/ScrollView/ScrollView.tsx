import React, { useEffect, useRef } from 'react'

export interface IProps {
  pullRefreshRender: React.ReactNode
  onRefreshCb: () => Promise<void> // 刷新回调，在用户调用resolve/reject后执行
  scrollIntoView: string // 滑动至id为scrollIntoView的节点
}

const touchParams = {
  canTouch: true,
  startY: 0, // 开始坐标
  preTouchS: 0, // 上一次坐标
}
const ScrollView: React.FC<IProps> = (props) => {
  const {
    pullRefreshRender,
    onRefreshCb,
    scrollIntoView = '',
    children,
  } = props
  const wrapRef = useRef<HTMLDivElement>()
  const refreshContentRef = useRef<HTMLDivElement>()
  const directionRef = useRef<string>('')

  const getTop = (dom: HTMLElement) => parseInt(dom.style.top, 10)

  useEffect(() => {
    try {
      const dom = document.getElementById(scrollIntoView)

      if (typeof scrollIntoView !== 'string') {
        throw new Error('scrollInfoView must be string')
      }

      if (dom === null) {
        return
      }

      const { offsetTop } = dom // 元素距离父元素顶部的高度

      wrapRef.current.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    } catch (e) {
      console.log(e)
    }
  }, [scrollIntoView])

  const reSet = () => {
    const dom = wrapRef.current
    dom.style.top = '0px'
    touchParams.canTouch = true
  }

  useEffect(() => {
    const dom = wrapRef.current
    dom.addEventListener('touchstart', (e) => {
      touchParams.startY = e.touches[0].pageY
    })
    dom.addEventListener('touchend', () => {
      const direction = directionRef.current
      touchParams.canTouch = false
      if (direction === 'down') {
        onRefreshCb()
          .then(() => {
            reSet()
          })
          .catch(() => {
            reSet()
          })
      } else if (direction === 'up') {
        reSet()
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
