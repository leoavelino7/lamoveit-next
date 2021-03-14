import { useState, useContext, useEffect, createContext, ReactNode } from 'react'
import { ChallengesContext } from './ChallengesContext'

interface CountDownContextData {
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  startCountDown: () => void
  resetCountDown: () => void
}

interface CountDownProviderProps {
  children: ReactNode
}

let countDownTimeout: NodeJS.Timeout

export const CountDownContext = createContext({} as CountDownContextData)

export function CountDownProvider({ children }: CountDownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime((oldTime) => oldTime - 1)
      }, 1000)
    } else if (isActive && time === 0){
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time]) 
  
  function startCountDown() {
    setIsActive(true)
  }

  function resetCountDown() {
    clearTimeout(countDownTimeout)
    setIsActive(false)
    setTime(0.1 * 60)
    setHasFinished(false)
  }

  return (
    <CountDownContext.Provider value={ { 
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountDown,
        resetCountDown
      }}>
      {children}
    </CountDownContext.Provider>
  )
}