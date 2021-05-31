import React from 'react'

interface IState {
  active: number
  canClick: boolean
}

export interface IProps {
  itemSize: number // 每个抽奖项的size
  totalTime?: number
  resultIndex?: number
  defaultIndex?: number
  jumpChange?: number
  format?: Array<Array<number>>
  list?: Array<{ key: string; img: string }>
  onClickStart?: () => void
  onOverTime?: () => void
}

export default class Prize extends React.Component<IProps, IState> {
  private timer = null

  private times = 0 // 已滚动的时长

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    itemSize: 100,
    totalTime: 5000,
    resultIndex: -1, // 后台决定中哪个
    jumpChange: Math.random() * 3 + 400, // 变化值
    format: [
      [1, 2, 3],
      [8, -1, 4],
      [7, 6, 5],
    ],
    list: [
      {
        key: 'k001',
        img:
          'https://avatar-static.segmentfault.com/322/993/3229933453-5d9eae10aa33b_huge256',
      },
      {
        key: 'k002',
        img:
          'https://avatar-static.segmentfault.com/322/993/3229933453-5d9eae10aa33b_huge256',
      },
      {
        key: 'k003',
        img:
          'https://avatar-static.segmentfault.com/322/993/3229933453-5d9eae10aa33b_huge256',
      },
      {
        key: 'k004',
        img:
          'https://avatar-static.segmentfault.com/322/993/3229933453-5d9eae10aa33b_huge256',
      },
      {
        key: 'k005',
        img:
          'https://avatar-static.segmentfault.com/322/993/3229933453-5d9eae10aa33b_huge256',
      },
      {
        key: 'k006',
        img:
          'https://avatar-static.segmentfault.com/322/993/3229933453-5d9eae10aa33b_huge256',
      },
      {
        key: 'k007',
        img:
          'https://avatar-static.segmentfault.com/322/993/3229933453-5d9eae10aa33b_huge256',
      },
      {
        key: 'k008',
        img:
          'https://avatar-static.segmentfault.com/322/993/3229933453-5d9eae10aa33b_huge256',
      },
    ],
  }

  constructor(props: IProps) {
    super(props)
    this.state = {
      active: 1,
      canClick: true,
    }
  }

  /**
   *  获取抽奖项
   * @returns
   */
  getLength = (): number => {
    let len = 0
    const { format } = this.props
    format.forEach((item) => {
      len += item.length
    })
    return len - 1
  }

  /*
   * 缓动函数
   * currentTime    当前相对于ease-in/ease-out开始时的时间经过的时间(取决于当前时间有没有过半)
   * duration       抽奖总时长
   * startValue     动画时间间隔的初始值
   * changeValue    动画时间间隔的最终value (延时从startValue一直增加到changeValue)
   */
  easeOut = (
    currentTime: number,
    startValue: number,
    changeValue: number,
    duration: number
  ): number => {
    // 把currentTime映射到[0,2]的区间 [0,1]为ease-in, [1,2]为ease-out 【含义是ease-in/ease-out开始后经过的时间】
    const x = currentTime / (duration / 2)
    // 是否过半
    // changeValue / 2 是因为ease-in和ease-out各占一半的增长空间
    if (x < 1) {
      return (changeValue / 2) * x * x + startValue
    }

    // 过半了 要变成ease-out
    // 由于[0,1]是ease-in状态，要获取时间在ease-out[1,2]上走过的时间
    const easeoutTime = x - 1
    return (
      (-changeValue / 2) * (easeoutTime * (easeoutTime - 2) - 1) + startValue
    )
  }

  /**
   *  滚动
   */
  public Scrolle = (): void => {
    const len = this.getLength()
    this.setState(
      (pre) => ({
        active: pre.active === len ? 1 : pre.active + 1,
      }),
      () => {
        const { active } = this.state
        const { totalTime, resultIndex, jumpChange } = this.props

        console.log(resultIndex)

        if (
          this.times > totalTime &&
          resultIndex !== -1 &&
          resultIndex === active
        ) {
          // 达到预设时间 且 & 后端返回了结果 & 滚动到了结果
          console.log(`你中了奖品${resultIndex}`)
          this.setState({ canClick: true })
          clearTimeout(this.timer)
          return
        }
        // 超过我们预定得时间了但还是没返回结果
        if (this.times > totalTime && resultIndex === -1) {
          const { onOverTime } = this.props
          if (typeof onOverTime === 'function') {
            onOverTime()
          }
          clearTimeout(this.timer)
          this.setState({ canClick: true, active: 1 })
          return
        }
        const timeout = this.easeOut(this.times, 50, jumpChange, totalTime)
        this.times += timeout

        this.timer = setTimeout(this.Scrolle, timeout)
      }
    )
  }

  handleStart = (): void => {
    const { canClick } = this.state
    const { onClickStart } = this.props

    if (!canClick) {
      return
    }

    // 外面可以开始
    if (typeof onClickStart === 'function') {
      onClickStart()
    }

    // reset an start
    this.times = 0
    this.setState(
      {
        active: 1,
        canClick: false,
      },
      () => {
        this.Scrolle()
      }
    )
  }

  render(): React.ReactNode {
    const { active } = this.state
    const { format, itemSize, list } = this.props
    const rowSize = format[0].length

    const wrapStyle = {
      width: itemSize * rowSize,
      height: itemSize * rowSize,
    }
    const itemStyle = {
      width: itemSize,
      heigth: itemSize,
    }
    return (
      <div style={wrapStyle} className="container">
        <div className="squares">
          {format.map((row) =>
            row.map((item) =>
              item !== -1 ? (
                <img
                  alt=""
                  src={list[item - 1]?.img}
                  key={list[item - 1]?.key}
                  style={itemStyle}
                  className={`${active === item ? 'active' : ''} square`}
                />
              ) : (
                <div
                  key={item}
                  style={itemStyle}
                  role="button"
                  className="choujiang-button"
                  onClickCapture={this.handleStart}
                >
                  抽奖
                </div>
              )
            )
          )}
        </div>
      </div>
    )
  }
}
