import React, { PropsWithChildren, useEffect, useRef } from 'react'

import classNames from 'classnames'
import Overlay from '../Overlay'

import { popupPredixCls } from '../_util/config'

export interface IProps {
  show: boolean
  direction: 'bottom' | 'top' | 'mid' | 'right' | 'left'
  mask?: boolean
  height?: number
  onClickMask: () => void
  onOpen: () => void
  onClose: () => void
}

const Popup: React.FC<PropsWithChildren<IProps>> = ({
  show,
  direction = 'bottom',
  children,
  mask = true,
  height,
  onClickMask,
  onOpen,
  onClose,
}) => {
  const classes = classNames(
    `${popupPredixCls}`,
    `pop--${direction}`,
    `${show ? 'show' : ''}`
  )

  const styles = {
    height: typeof height === 'number' ? `${height}px` : 'auto',
  }

  const flag = useRef<number>(0)

  useEffect(() => {
    flag.current += 1
    if (flag.current === 1) {
      // 首次挂载
      return
    }
    if (show) {
      onOpen()
    } else {
      onClose()
    }
  }, [onClose, onOpen, show])

  return (
    <>
      {mask && <Overlay onClick={onClickMask} show={show} />}
      <div style={styles} className={classes}>
        {children}
      </div>
    </>
  )
}

export default Popup
