import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LeftArray, RightArray } from './Array'

// 暂不支持自定义节点
export interface IProps {
  imgList: Array<string>
  showArray: boolean // 是否展示箭头
  showPoints: boolean // 是否展示轮播点
  autoPlay?: boolean // 自动播放
  during?: number // 自动播放的间隔 ms
}
const Carousel: React.FC<IProps> = (props) => {
  const {
    imgList = [],
    showArray = true,
    showPoints = true,
    autoPlay = true,
    during = 2000,
  } = props
  const [list, setList] = useState([])

  const initParams = useRef({
    max: 0,
    i: 1,
  })

  const [curIndex, setCurIndex] = useState(initParams.current.i)

  const wrapRef = useRef<HTMLDivElement>()

  const touchParams = useRef<{
    startX: number
    currentX: number
    end: number
  }>({
    startX: 0,
    currentX: 0,
    end: 0,
  })
  
  const touchStartLeft = useRef<number>(0)
  const preTouchS = useRef<number>(0)

  useEffect(() => {
    // 初始化参数
    initParams.current.max = imgList.length

    // 首尾拼接 [1,2,3] => [3,1,2,3,1] for 无缝滚动
    const temp = [...imgList]
    temp.unshift(imgList[imgList.length - 1])
    temp.push(imgList[0])
    setList(temp)
  }, [imgList])

  const leftMove = (offset: number) => {
    const dom = wrapRef.current
    const left = parseInt(dom.style.left || '0', 10)
    let newLeft = ''
    if (left > 0) {
      newLeft = `${Math.floor(left / 100) * 100 - 100 * offset}%`
    } else {
      newLeft = `${Math.ceil(left / 100) * 100 - 100 * offset}%`
    }
    dom.style.transitionDuration = '0.3s'
    dom.style.left = newLeft
    initParams.current.i += 1 * offset
    setCurIndex(initParams.current.i)

    if (initParams.current.i === initParams.current.max + 1) {
      initParams.current.i = 1 * offset
      setCurIndex(initParams.current.i)
      setTimeout(() => {
        dom.style.transitionDuration = '0s'
        dom.style.left = '-100%'
      }, 300)
    }
  }
  const rightMove = (offset: number) => {
    const dom = wrapRef.current
    const left = parseInt(dom.style.left || '0', 10)
    let newLeft = ''
    if (left > 0) {
      newLeft = `${Math.floor(left / 100) * 100 + 100 * offset}%`
    } else {
      newLeft = `${Math.floor(left / 100) * 100 + 100 * offset}%`
    }

    dom.style.transitionDuration = '0.3s'
    dom.style.left = newLeft
    initParams.current.i -= 1 * offset
    setCurIndex(initParams.current.i)

    if (initParams.current.i === 0) {
      initParams.current.i = initParams.current.max
      setCurIndex(initParams.current.i)
      setTimeout(() => {
        dom.style.transitionDuration = '0s'
        dom.style.left = `${-(initParams.current.max * 100)}%`
      }, 300)
    }
  }

  /**
   * 自动播放
   */
  useEffect(() => {
    let timer = null
    if (autoPlay) {
      timer = setInterval(() => leftMove(1), during)
    }
    return () => clearInterval(timer)
  }, [autoPlay, during])

  /**
   * 添加触摸事件
   */
  useEffect(() => {
    const dom = wrapRef.current
    dom.addEventListener('touchstart', (e) => {
      touchStartLeft.current = parseInt(dom.style.left || '0px',10)
      touchParams.current.startX = e.touches[0].pageX
    })
    dom.addEventListener('touchmove', (e) => {

      touchParams.current.currentX = e.touches[0].pageX
      const offset = touchParams.current.currentX - touchParams.current.startX

      dom.style.left =
        offset - preTouchS.current > 0  // 比较本次位置和上次位置，判断移动方向
          ? `${parseInt(dom.style.left, 10) + 1}%`
          : `${parseInt(dom.style.left, 10) - 1}%`
      
      preTouchS.current = offset // 记录本次的位置
    })
    dom.addEventListener('touchend', (e) => {
      const offset = touchParams.current.currentX - touchParams.current.startX

      if (offset > 0) {
        rightMove(1)
      } else {
        leftMove(1)
      }
    })
  }, [])

  /**
   * 点击圆点点
   * @param index
   */
  const onClickPoint = useCallback(
    (index: number) => {
      const i = index + 1
      if (i > curIndex) {
        leftMove(i - curIndex)
      } else if (i < curIndex) {
        rightMove(curIndex - i)
      }
    },
    [curIndex]
  )
  return (
    <div className="carousel-container">
      {/* 箭头 */}
      {showArray && (
        <div className="carousel-array-row">
          <LeftArray onClick={() => rightMove(1)} />
          <RightArray onClick={() => leftMove(1)} />
        </div>
      )}

      {/* 图 */}
      <div ref={wrapRef} className="carousel-wrap" style={{ left: '-100%' }}>
        {list.map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={item + i} className="block">
            <img src={item} alt="" />
          </div>
        ))}
      </div>

      {/* 轮播点 */}
      {showPoints && (
        <div className="point-group">
          {imgList.map((item, index) => (
            <div
              onClickCapture={() => onClickPoint(index)}
              key={Math.random()}
              className={`point ${index + 1 === curIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
export default Carousel
