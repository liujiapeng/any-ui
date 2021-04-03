import React, { useRef, useImperativeHandle } from 'react'

export interface IProps {
  process: number // 进度 0 - 100
  color: string // 进度条颜色
  duration: number // 持续时间
  delay: number // 延迟开始时间
  auto?: boolean // 是否自动执行
}

interface animateRefProps extends SVGAnimateElement {
  beginElement: () => void
}

export interface forwardRefProps {
  excute: () => void
}

/**
 *  React.forwardRef<useImperativeHandle Props, 接收的props>
 */
const CircleStep = React.forwardRef<forwardRefProps, IProps>((props, ref) => {
  const {
    process,
    color = '#1593FF',
    delay = 1500,
    duration = 1000,
    auto = true,
  } = props

  // animate DOM
  const animateRef = useRef<animateRefProps>()

  /**
   * 手动触发
   */
  const excute = () => {
    animateRef.current.beginElement()
  }

  /**
   * 通过ref暴露
   */
  useImperativeHandle(ref, () => ({
    excute,
  }))

  return (
    <div className="cs-wrap">
      <svg className="circle-step" viewBox="0 0 150 150">
        <circle
          r="70"
          cy="75"
          cx="75"
          stroke="#EAEFF4"
          style={{
            strokeWidth: 8,
            strokeLinejoin: 'round',
            strokeLinecap: 'round',
          }}
          fill="none"
        />
        <circle
          className="progress"
          r="70"
          cy="75"
          cx="75"
          style={{
            strokeWidth: 8,
            strokeLinejoin: 'round',
            strokeLinecap: 'round',
            strokeDashoffset: 471,
            strokeDasharray: 471,
          }}
          stroke={color}
          fill="none"
          transform="rotate(-90,75,75)"
        >
          <animate
            ref={animateRef}
            attributeName="stroke-dashoffset"
            attributeType="XML"
            from="471"
            to={`${471 - (process / 100) * 471}`}
            begin={auto ? `${delay}ms` : 'indefinite'}
            dur={`${duration}ms`}
            fill="freeze"
          />
        </circle>
      </svg>
    </div>
  )
})

CircleStep.displayName = 'CircleStep'

export default CircleStep
