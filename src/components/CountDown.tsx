import { useContext } from 'react'
import { CountDownContext } from '../context/CountDownContext'

import styles from '../styles/components/CountDown.module.css'

export function CountDown() {
  const { 
    minutes,
    seconds,
    hasFinished,
    isActive,
    resetCountDown,
    startCountDown  
  } = useContext(CountDownContext)
 
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button 
          disabled
          type="button" 
          className={styles.startCountDownButton}
        > 
          Ciclo encerrado
        </button>
      ) : (
        <>
          {
            isActive ? (
              <button 
                type="button" 
                className={`${styles.startCountDownButton} ${styles.startCountDownButtonActive}`}
                onClick={resetCountDown}
              > 
                Abandonar o ciclo
              </button>
            ) : (
              <button 
                type="button" 
                className={styles.startCountDownButton}
                onClick={startCountDown}
              > 
                Iniciar um ciclo
              </button>
            ) 
          }
        </>
      ) }
    </div>
  )
}