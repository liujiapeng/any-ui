import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

export type MarqueeDir = 'horizontal' | 'vertical';

export interface MarqueeProps {
  direction: MarqueeDir; // 滚动方向
  content: string | React.ReactNode; // 滚动内容
  duration: number; // 持续时间
}

const addKeyFrames = (rules: string) => {
  // 创建style标签
  const style = document.createElement('style');
  style.innerHTML = rules;
  document.getElementsByTagName('head')[0].appendChild(style);
};

const Marquee: React.FC<MarqueeProps> = (props) => {
  const { direction, content, duration } = props;
  const wrapRef = useRef<HTMLDivElement>();
  const contentRef = useRef<HTMLParagraphElement>();
  useEffect(() => {
    const contentDom = contentRef.current;
    const wrapWidth = wrapRef.current.clientWidth;
    const wrapHeight = wrapRef.current.clientHeight;
    if (direction === 'horizontal') {
      contentDom.style.transform = `translateX(${wrapWidth}px)`;
      contentDom.style.paddingLeft = '0px';
      const rules = ` @keyframes horizontal-move{
        0% {
          transform: translateX(${wrapWidth}px);
        }
        100% {
          transform: translate(calc(-100%));
        }`;
      addKeyFrames(rules);
      contentRef.current.style.animation = `horizontal-move ${duration}s linear infinite`;
    } else {
      contentDom.style.transform = `translateY(${wrapHeight}px)`;
      contentDom.style.paddingTop = '0px';
      const rules = ` @keyframes vertical-move{
        0% {
          transform: translateY(${wrapHeight}px);
        }
        100% {
          transform: translateY(calc(-100%));
        }`;
      addKeyFrames(rules);
      contentRef.current.style.animation = `vertical-move ${duration}s linear infinite`;
    }
  }, []);

  return (
    <div
      ref={wrapRef}
      className={
        direction == 'horizontal' ? 'horizontal-carousel' : 'vertical-carousel'
      }
    >
      <p ref={contentRef} className="content">
        {content}
      </p>
    </div>
  );
};

Marquee.defaultProps = {};

export default Marquee;
