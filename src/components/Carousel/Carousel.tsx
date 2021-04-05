import React, { useEffect, useRef, useState } from 'react'

interface IProps {
  imgList: Array<string | React.ReactNode>
}
const Carousel: React.FC<IProps> = ({ imgList }) => {
  const [list, setList] = useState([])

  const initParams = useRef({
    max: 0,
    i: 0,
  })

  const wrapRef = useRef<HTMLDivElement>()

  useEffect(() => {
    // 初始化参数
    initParams.current.max = imgList.length

    // 为无缝滚动做准备
    const temp = [...imgList]
    temp.unshift(imgList[0])
    temp.push(imgList[imgList.length - 1])
    setList(temp)
  }, [imgList])

  const right = () => {
    const dom = wrapRef.current
    dom.style.transitionDuration = '0.3s'
    dom.style.left = `${parseInt(dom.style.left || '0', 10) - 100}%`
    initParams.current.i += 1

    if (initParams.current.i === initParams.current.max + 1) {
      setTimeout(() => {
        dom.style.transitionDuration = '0s'
        dom.style.left = '-100%'
        initParams.current.i = 1
      }, 300)
    }
  }
  const left = () => {
    const dom = wrapRef.current
    dom.style.transitionDuration = '0.3s'
    dom.style.left = `${parseInt(dom.style.left || '0', 10) + 100}%`
    initParams.current.i -= 1

    if (initParams.current.i === 0) {
      setTimeout(() => {
        dom.style.transitionDuration = '0s'
        dom.style.left = '-400%'
        initParams.current.i = 4
      }, 300)
    }
  }
  return (
    <div className="container">
      <div ref={wrapRef} className="carousel-wrap" style={{ left: '-100%' }}>
        {list.map((item) => (
          <div key={item} className="block">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
