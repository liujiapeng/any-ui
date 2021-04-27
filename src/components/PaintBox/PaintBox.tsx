import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import PaintBoxStories from './PaintBox.stories'

export interface IProps {
  width?: number
  height?: number
  contentStyle?: {
    fillStyle?: string
    strokeStyle?: string
    lineWidth?: number
    lineCap?: CanvasLineCap
    lineJoin?: CanvasLineJoin
    shadowBlur?: number
    shadowColor?: string
  }
}
export interface forwardRefProps {
  reset: () => void
}

const defaultProps: IProps = {
  width: 343,
  height: 285,
  contentStyle: {
    fillStyle: '#F5F7F9',
    strokeStyle: '#000',
    lineWidth: 1,
    lineCap: 'round',
    lineJoin: 'round',
    shadowBlur: 1,
    shadowColor: '#000',
  },
}

const PaintBox = React.forwardRef<forwardRefProps, IProps>((props, ref) => {
  const {
    width = defaultProps.width,
    height = defaultProps.height,
    contentStyle = defaultProps.contentStyle,
  } = props
  const canvasRef = useRef<HTMLCanvasElement>()
  const sr = useRef(null)
  /**
   * 手动触发
   */
  const reset = () => {
    const { canvas, content } = sr.current
    content.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
  }

  /**
   * 通过ref暴露
   */
  useImperativeHandle(ref, () => ({
    reset,
  }))
  const setStyle = useCallback(() => {
    const { content } = sr.current
    content.fillStyle = contentStyle.fillStyle
    content.fillRect(0, 0, width, height)
    content.strokeStyle = contentStyle.strokeStyle
    content.lineWidth = contentStyle.lineWidth
    content.lineCap = contentStyle.lineCap
    content.lineJoin = contentStyle.lineJoin
    content.shadowBlur = contentStyle.shadowBlur
    content.shadowColor = contentStyle.shadowColor
  }, [
    contentStyle.fillStyle,
    contentStyle.lineCap,
    contentStyle.lineJoin,
    contentStyle.lineWidth,
    contentStyle.shadowBlur,
    contentStyle.shadowColor,
    contentStyle.strokeStyle,
    height,
    width,
  ])
  const touchstart = useCallback((e: TouchEvent) => {
    const { canvas, content } = sr.current
    content.beginPath()
    const touch = e.targetTouches[0]
    const x = touch.clientX - canvas.offsetLeft
    const y = touch.clientY - canvas.offsetTop
    content.moveTo(x, y)
  }, [])
  const touchmove = useCallback((e: TouchEvent) => {
    e.preventDefault()
    const { canvas, content } = sr.current
    const touch = e.targetTouches[0]
    const x = touch.clientX - canvas.offsetLeft
    const y = touch.clientY - canvas.offsetTop
    content.lineTo(x, y)
    content.stroke()
  }, [])
  const touchend = useCallback(() => {
    const { content } = sr.current
    content.closePath()
  }, [])
  useEffect(() => {
    const canvas = canvasRef.current
    const content = canvas.getContext('2d')
    sr.current = {
      canvas,
      content,
    }
    setStyle()
    canvas.addEventListener('touchstart', touchstart)
    canvas.addEventListener('touchmove', touchmove)
    canvas.addEventListener('touchend', touchend)
  }, [setStyle, touchend, touchmove, touchstart])
  return <canvas ref={canvasRef} id="sign-Canvas" width="343" height="285" />
})

export default PaintBox
