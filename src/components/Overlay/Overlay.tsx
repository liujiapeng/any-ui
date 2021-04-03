import React from 'react'
import classNames from 'classnames'

import { overlayPredixCls } from '../_util/config'

export interface IProps {
  show: boolean
  onClick: () => void
}

const Overlay: React.FC<IProps> = ({ show, onClick }) => {
  const classes = classNames(`${overlayPredixCls}`, `${show ? 'mask' : ''}`)
  return <div onClick={onClick} className={classes} />
}

export default Overlay
