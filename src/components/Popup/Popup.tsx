import React, { PropsWithChildren, useEffect, useRef } from 'react';

import Overlay from '../Overlay';
import classNames from 'classnames';

import { popupPredixCls } from '../_util/config';

export interface IProps {
  show: boolean;
  direction: 'bottom' | 'top' | 'mid' | 'right' | 'left';
  mask?: boolean;
  onClickMask: () => void;
  onOpen: () => void;
  onClose: () => void;
}

const Popup: React.FC<PropsWithChildren<IProps>> = ({
  show,
  direction = 'bottom',
  children,
  mask = true,
  onClickMask,
  onOpen,
  onClose,
}) => {
  const classes = classNames(
    `${popupPredixCls}`,
    `pop--${direction}`,
    `${show ? `show` : ''}`
  );

  const flag = useRef<number>(0);

  useEffect(() => {
    flag.current += 1;
    if (flag.current === 1) {
      // 首次挂载
      return;
    }
    if (show) {
      onOpen();
    } else {
      onClose();
    }
  }, [show]);

  return (
    <>
      {mask && <Overlay onClick={onClickMask} show={show}></Overlay>}
      <div className={classes}>{children}</div>
    </>
  );
};

export default Popup;
