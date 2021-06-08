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

  const slideDuration = 0.3 // 整张滑动时的时间
  const touchSlideDuration = 0.1 // 触摸滑动的时间

  const autoRunTimer = useRef(null)

  const touchStartLeft = useRef<number>(0)
  const preTouchS = useRef<number>(0)

  const [translateX, setTranslateX] = useState('-100%')
  const [transitionDuration, setTransitionDuration] = useState(slideDuration)

  const move = useCallback(
    (translateX: string, duration: number | null = null) => {
      if (duration !== null) {
        setTransitionDuration(duration)
      }
      setTranslateX(translateX)
    },
    []
  )

  /**
   *  获取translate3d中的x值
   */
  const getTranslateX = useCallback((dom) => {
    const str = dom.style.transform
    const reg = /\(.*\)/g
    const y = str.match(reg)[0].match(/(?<=\()[^,]*(?=,)/)[0]
    return parseInt(y || '0px', 10)
  }, [])
  useEffect(() => {
    // 初始化参数
    initParams.current.max = imgList.length

    // 首尾拼接 [1,2,3] => [3,1,2,3,1] for 无缝滚动
    const temp = [...imgList]
    temp.unshift(imgList[imgList.length - 1])
    temp.push(imgList[0])
    setList(temp)
  }, [imgList])

  const translate = useCallback(
    (direction: 'right' | 'left', offset: number, type: string) => {
      if (type !== 'auto') {
        clearInterval(autoRunTimer.current)
      }
      const dom = wrapRef.current
      const left = getTranslateX(dom)
      let newTranslateX = ''
      if (direction === 'right') {
        if (left > 0) {
          newTranslateX = `${Math.floor(left / 100) * 100 + 100 * offset}%`
        } else {
          newTranslateX = `${Math.floor(left / 100) * 100 + 100 * offset}%`
        }
        initParams.current.i -= 1 * offset
      } else if (direction === 'left') {
        if (left > 0) {
          newTranslateX = `${Math.floor(left / 100) * 100 - 100 * offset}%`
        } else {
          newTranslateX = `${Math.ceil(left / 100) * 100 - 100 * offset}%`
        }
        initParams.current.i += 1 * offset
      }

      setCurIndex(initParams.current.i)
      move(newTranslateX, slideDuration)

      if (
        direction === 'left' &&
        initParams.current.i === initParams.current.max + 1
      ) {
        initParams.current.i = 1 * offset
        setCurIndex(initParams.current.i)
        setTimeout(() => {
          move('-100%', 0)
        }, 300)
      } else if (direction === 'right' && initParams.current.i === 0) {
        initParams.current.i = initParams.current.max
        setCurIndex(initParams.current.i)
        setTimeout(() => {
          move(`-${initParams.current.max * 100}%`, 0)
        }, 300)
      }
      if (type !== 'auto') {
        autoRunTimer.current = setInterval(
          () => translate('left', 1, 'auto'),
          during
        )
      }
    },
    [during, getTranslateX, move]
  )

  /**
   * 自动播放
   */
  useEffect(() => {
    if (autoPlay) {
      autoRunTimer.current = setInterval(
        () => translate('left', 1, 'auto'),
        during
      )
    }
    return () => clearInterval(autoRunTimer.current)
  }, [autoPlay, during, translate])

  /**
   * touch start
   */
  const touchStart = useCallback(
    (e) => {
      const dom = wrapRef.current
      setTransitionDuration(touchSlideDuration)
      clearInterval(autoRunTimer.current)
      touchStartLeft.current = getTranslateX(dom)
      touchParams.current.startX = e.touches[0].pageX
    },
    [getTranslateX]
  )

  /**
   * touch move
   */
  const touchMove = useCallback(
    (e) => {
      const dom = wrapRef.current
      touchParams.current.currentX = e.touches[0].pageX
      const offset = touchParams.current.currentX - touchParams.current.startX

      //  新的translate值 = 偏移距离占元素宽度的百分比 + 原来的left百分比
      const translateX = `${
        (offset / dom.clientWidth) * 100 + touchStartLeft.current
      }%`

      move(translateX)
      preTouchS.current = offset
    },
    [move]
  )

  /**
   * touch end
   */
  const touchEnd = useCallback(() => {
    setTransitionDuration(slideDuration)
    const { currentX } = touchParams.current
    const { startX } = touchParams.current
    const isMove = currentX !== 0 // 没有移动currentX为0

    if (!isMove) {
      return
    }

    const offset = currentX - startX

    if (isMove && offset > 0) {
      translate('right', 1, 'slider')
    } else {
      translate('left', 1, 'slider')
    }
    touchParams.current.currentX = 0
  }, [translate])

  /**
   * 添加触摸事件
   */
  useEffect(() => {
    const dom = wrapRef.current
    dom.addEventListener('touchstart', touchStart)
    dom.addEventListener('touchmove', touchMove)
    dom.addEventListener('touchend', touchEnd)
    return () => {
      dom.removeEventListener('touchstart', touchStart)
      dom.removeEventListener('touchmove', touchMove)
      dom.removeEventListener('touchend', touchEnd)
    }
  }, [touchEnd, touchMove, touchStart])

  /**
   * 点击圆点点
   * @param index
   */
  const onClickPoint = useCallback(
    (index: number) => {
      const i = index + 1
      if (i > curIndex) {
        translate('left', i - curIndex, 'point')
      } else if (i < curIndex) {
        translate('right', curIndex - i, 'point')
      }
    },
    [curIndex, translate]
  )
  return (
    <div className="carousel-container">
      {/* 箭头 */}
      {showArray && (
        <div className="carousel-array-row">
          <LeftArray onClick={() => translate('right', 1, 'array')} />
          <RightArray onClick={() => translate('left', 1, 'array')} />
        </div>
      )}

      {/* 图 */}
      <div
        ref={wrapRef}
        className="carousel-wrap"
        style={{
          transform: `translate3d(${translateX},0px,0px)`,
          transitionDuration: `${transitionDuration}s`,
        }}
      >
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
