import { useState, useEffect } from 'react'
export const useInterval = (callback: () => void, duration: number = 1000) => {
  useEffect(() => {
    const id = setInterval(callback, duration)
    return () => clearInterval(id)
  }, [callback, duration])
}

export const useTimer = (onTimerEnd?: () => void) => {
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    if (!isActive) return
    const decrementSeconds = () => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } else if (minutes > 0) {
        setMinutes(minutes - 1)
        setSeconds(59)
      } else {
        setIsActive(false)
        onTimerEnd?.()
      }
    }

    const intervalId = setInterval(decrementSeconds, 1000)

    return () => clearInterval(intervalId)
  }, [isActive, seconds, minutes, onTimerEnd])

  const startTimer = (startMinutes: number, startSeconds: number) => {
    setIsActive(true)
    setMinutes(startMinutes)
    setSeconds(startSeconds)
  }

  const pauseTimer = () => setIsActive(false)

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(0)
    setSeconds(0)
  }

  return {
    minutes,
    seconds,
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
  }
}
