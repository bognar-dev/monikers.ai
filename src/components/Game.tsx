"use client"

import { useGame } from '@/components/GameContext'
import { Button } from "@/components/ui/button"
import { CardContent, Card as CardUI } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { Check, PlayCircle, SkipForward } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import Card from './Card'
import Timer from './Timer'

export default function Game() {
  const { gameState, nextTurn, correctGuess, skipCard, confirmNextTurn } = useGame()

  useEffect(() => {
    if (gameState.deck.length === 0 && gameState.isPlaying) {
      nextTurn()
    }
  }, [gameState])

  const handleCorrectGuess = useCallback(() => {
    if (!gameState.isBreak && gameState.isPlaying) {
      correctGuess()
    }
  }, [correctGuess, gameState.isBreak, gameState.isPlaying])

  const handleSkipCard = useCallback(() => {
    if (!gameState.isBreak && gameState.isPlaying) {
      skipCard()
    }
  }, [skipCard, gameState.isBreak, gameState.isPlaying])

  if (!gameState.isPlaying) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8"
    >
      <CardUI className="w-full max-w-4xl backdrop-blur-md rounded-xl overflow-hidden">
        <CardContent className="p-6 sm:p-8 space-y-6 font-azeretMono">
          <div className="grid grid-cols-2 gap-4 text-xl sm:text-2xl  text-center text-gray-800">
            <p className="col-span-2">Round {gameState.currentRound}</p>
            <p className="col-span-2">Current Team: {gameState.teamNames[gameState.currentTeam]}</p>
            <p>{gameState.teamNames.A}: {gameState.scores.A}</p>
            <p>{gameState.teamNames.B}: {gameState.scores.B}</p>
          </div>

          {gameState.isBreak ? (
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl  text-primary ">
                {gameState.teamNames[gameState.currentTeam === 'A' ? 'B' : 'A']}, are you ready?
              </h2>
              <Timer />
              <Card card={{ category: '', text: '' }} />
              <Button
                onClick={confirmNextTurn}
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-background text-xl"
              >
                <PlayCircle className="mr-2 h-6 w-6" /> Start Turn
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center space-y-4">
                <h2 className="text-3xl sm:text-4xl  text-primary ">
                  {gameState.currentRound === 1 ? "Describe the word!" : 
                   gameState.currentRound === 2 ? "One word only!" : 
                   gameState.currentRound === 3 ? "Act it out!" : 
                   "Play!"}
                </h2>
              </div>
              <Timer />
              {gameState.deck.length > 0 && (
                <div>
                  <Card card={gameState.deck[0]} />
                </div>
              )}
              <div className="flex justify-center items-center mt-6 space-x-4">
                <Button
                  onClick={handleCorrectGuess}
                  variant="default"
                  size="lg"
                  className=" text-background text-xl"
                >
                  <Check className="mr-2 h-6 w-6" /> Correct
                </Button>
                <Button
                  onClick={handleSkipCard}
                  variant="secondary"
                  size="lg"
                  className=" text-background bg-red-400 text-xl"
                >
                  <SkipForward className="mr-2 h-6 w-6" /> Skip
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </CardUI>
      {!gameState.isBreak && (
        <Button
          onClick={nextTurn}
          variant="link"
          size="lg"
          className="mt-4 text-xl"
        >
          End Turn
        </Button>
      )}
    </motion.div>
  )
}

