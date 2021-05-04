import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export interface IProps {
  endTime: string
  endText?: string
}

const CountDown: React.FC<PropsWithChildren<IProps>> = ({
  endTime,
  endText,
  children,
}) => {
  const [restTime, setRestTime] = useState(0)

  const timer = useRef(null)

  const cal = useCallback(() => {
    const endTimeStamp = new Date(endTime).getTime()
    const r = endTimeStamp - Date.now()
    setRestTime(r < 0 ? 0 : r)
  }, [endTime])

  useEffect(() => {
    clearInterval(timer.current)
    cal()
    timer.current = setInterval(cal, 1000)
    return () => clearInterval(timer.current)
  }, [cal])

  const leftPad = useCallback((str: string, len: number, ch = ' ') => {
    if (str.length >= len) return str
    const rest = len - str.length
    let s = str
    let i = 0
    while (i < rest) {
      s = ch + s
      i += 1
    }
    return s
  }, [])

  const getFormatData = useCallback(
    (rest: number) => {
      const curryLeftpad = (t: string) => leftPad(t, 2, 0)
      const d = Math.floor(rest / (1 * 24 * 60 * 60 * 1000))
      const rest1 = rest - d * 24 * 60 * 60 * 1000
      const h = Math.floor(rest1 / (1 * 60 * 60 * 1000))
      const rest2 = rest1 - h * 60 * 60 * 1000
      const m = Math.floor(rest2 / (1 * 60 * 1000))
      const rest3 = rest2 - m * 60 * 1000
      const s = Math.floor(rest3 / (1 * 1000))
      return {
        d: curryLeftpad(String(d)),
        h: curryLeftpad(String(h)),
        m: curryLeftpad(String(m)),
        s: curryLeftpad(String(s)),
      }
    },
    [leftPad]
  )

  const isOver = useMemo(() => restTime <= 0, [restTime])

  return isOver ? endText : (children as any)(getFormatData(restTime))
}

export default CountDown
