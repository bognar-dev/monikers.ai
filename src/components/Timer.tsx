'use client'

import { useGame } from '@/components/GameContext'
import { Progress } from "@/components/ui/progress"
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { useCallback, useEffect } from 'react'

export default function Timer() {
  const { gameState, setGameState, nextTurn } = useGame()

  const decrementTimer = useCallback(() => {
    if (!gameState.isBreak && gameState.isPlaying) {
      setGameState(prevState => ({
        ...prevState,
        timeLeft: prevState.timeLeft - 1,
      }))
    }
  }, [setGameState, gameState.isBreak, gameState.isPlaying])

  useEffect(() => {
    const timer = setInterval(decrementTimer, 1000)
    return () => clearInterval(timer)
  }, [decrementTimer])

  useEffect(() => {
    if (gameState.timeLeft === 0 && !gameState.isBreak) {
      nextTurn()
    }
  }, [gameState.timeLeft, gameState.isBreak, nextTurn])

  const progress = (gameState.timeLeft / gameState.initialTimeLeft) * 100

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-4"
      >
        <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-pulse" />
        <span className="text-4xl sm:text-6xl  text-primary">
          {gameState.timeLeft}s
        </span>
      </motion.div>
      <Progress value={progress} className="h-3 sm:h-4" />
    </div>
  )
}

