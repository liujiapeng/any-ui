import React, { useCallback, useMemo, useState } from 'react'

export interface IProps {
  /** 图片宽 */
  width: number

  /** 图片高 */
  height: number

  /** 图片地址 */
  src: string

  /** 是否需要占位图 */
  isPlaceHolder?: boolean

  /** 占位元素 string - 默认背景色  ReactNode - 自定义元素 */
  placeHolder?: string | React.ReactNode

  /** 透传类名 */
  className?: string

  /** 延迟(ms) 当经过该时间没有加载完毕才使用占位 */
  delay?: number
}

type ImageStatus = 'suc' | 'loading' | 'error'

const Image: React.FC<IProps> = (props) => {
  const {
    width,
    height,
    src = '',
    isPlaceHolder = true,
    className = '',
    placeHolder = '',
    delay = 0,
  } = props

  const radio = useMemo(() => `${(height / width) * 100}%`, [width, height])
  const [status, setStatus] = useState<ImageStatus>(
    isPlaceHolder ? 'loading' : 'suc'
  )

  const placeHolderRender = useMemo(() => {
    if (typeof placeHolder === 'string') {
      return (
        <div
          style={{
            background: placeHolder,
            width: '100%',
            paddingBottom: radio,
          }}
          className="image-placeholder"
        />
      )
    }
    return placeHolder
  }, [placeHolder, radio])

  const onLoad = useCallback(() => {
    setStatus('suc')
  }, [])

  return (
    <div className="image-wrap">
      <img className={className} onLoad={onLoad} alt="" src={src} />
      {status === 'loading' && placeHolderRender}
    </div>
  )
}

export default Image
