import React, { useCallback, useEffect, useRef } from 'react'

type baseFnType = (...args: any) => void | unknown

type RightOptionsType = {
  text: string
  onPress: baseFnType
  style: {
    backgroundColor: string
    color: string
  }
}

export interface SwipeActionProps {
  index: number
  right?: RightOptionsType[]
  onOpen?: baseFnType
  onClose?: baseFnType
  disabled?: boolean
  children: React.ReactNode
  autoClose: boolean
}

const SwipeAction: React.FC<SwipeActionProps> = (props) => {
  const {
    right: btnOptions,
    index,
    onOpen,
    onClose,
    disabled = false,
    children,
    autoClose = false,
  } = props

  const contentDomRef = useRef<HTMLDivElement>(null)
  const btnDomRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)
  const directionRef = useRef<string>('') // 保存滑动方向,touchmove和touchend里都要用到

  const preTouchS = useRef<number>(0)

  /**
   * @description 滑动过程
   * @param e
   */
  const touchmove = useCallback(
    (e) => {
      if (disabled) return
      const contentDom = contentDomRef.current
      const startX = touchStartX.current // 触碰开始
      const currentX = e.touches[0].pageX //  实时位置
      const btnWidth = btnDomRef.current.offsetWidth // 按钮宽度 即滑动的最大距离

      const touchS = currentX - startX

      if (touchS - preTouchS.current < 0) {
        directionRef.current = 'left'
      } else {
        directionRef.current = 'right'
      }

      if (
        parseInt(contentDom.style.left, 10) > 5 &&
        directionRef.current === 'right'
      ) {
        return
      }

      // 滑倒头了
      if (
        Math.abs(touchS) >= btnWidth * 1.5 &&
        directionRef.current === 'left'
      ) {
        return
      }

      // window.requestAnimationFrame(() => {
      contentDom.style.left = `${touchS}px`
      // })

      preTouchS.current = touchS
    },
    [disabled]
  )

  /**
   * @description 滑动开始 记录开始的位置
   * @param e
   */
  const touchstart = useCallback((e) => {
    touchStartX.current = e.touches[0].pageX
  }, [])

  /**
   * @description 滑动结束 还原位置
   * @param e
   */
  const touchend = useCallback(() => {
    const contentDom = contentDomRef.current
    const direction = directionRef.current // 往哪滑的
    const btnWidth = btnDomRef.current.offsetWidth // 按钮宽度 即滑动的最大距离
    if (direction === 'left') {
      contentDom.style.left = `${-btnWidth}px`
      typeof onOpen === 'function' && onOpen(index)
    } else if (direction === 'right') {
      contentDom.style.left = `${0}px`
      typeof onClose === 'function' && onClose(index)
    }
  }, [index, onClose, onOpen])

  /**
   * 还原
   */
  const handleReset = () => {
    const contentDom = contentDomRef.current
    contentDom.style.left = '0px'
  }

  /**
   *  @description 组件挂载 监听/移除事件
   */
  useEffect(() => {
    const contentDom = contentDomRef.current
    contentDom.style.transition = '0.1s all'
    contentDom.addEventListener('touchstart', touchstart)
    contentDom.addEventListener('touchmove', touchmove)
    contentDom.addEventListener('touchend', touchend)
    return () => {
      contentDom.removeEventListener('touchstart', touchstart)
      contentDom.removeEventListener('touchmove', touchmove)
      contentDom.removeEventListener('touchend', touchend)
    }
  }, [touchend, touchmove, touchstart])

  return (
    <div className="slider-wrap">
      <div ref={contentDomRef} className="slider-content">
        {children}
      </div>
      <div ref={btnDomRef} className="slider-btn">
        {btnOptions.map((item) => (
          <button
            type="button"
            key={item.text}
            onClick={() => {
              autoClose && handleReset()
              item.onPress(index)
            }}
            style={{
              background: item.style.backgroundColor,
              color: item.style.color,
            }}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SwipeAction
