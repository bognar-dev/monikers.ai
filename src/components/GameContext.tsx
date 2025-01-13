'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

type Team = 'A' | 'B'

interface Card {
  text: string
  category: string
}

interface GameState {
  deck: Card[]
  currentRound: number
  currentTeam: Team
  teamNames: { A: string; B: string }
  scores: { A: number; B: number }
  timeLeft: number
  initialTimeLeft: number
  isPlaying: boolean
  isBreak: boolean
}

interface GameContextType {
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  startGame: (deck: Card[], teamNames: { A: string; B: string }, timeLeft: number) => void
  nextTurn: () => void
  correctGuess: () => void
  skipCard: () => void
  confirmNextTurn: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    deck: [],
    currentRound: 0,
    currentTeam: 'A',
    teamNames: { A: 'Team A', B: 'Team B' },
    scores: { A: 0, B: 0 },
    timeLeft: 60,
    initialTimeLeft: 60,
    isPlaying: false,
    isBreak: false,
  })

  useEffect(() => {
    const savedState = localStorage.getItem('monikersMadnessState')
    if (savedState) {
      setGameState(JSON.parse(savedState))
    }
  }, [])

  useEffect(() => {
    if (gameState.isPlaying) {
      localStorage.setItem('monikersMadnessState', JSON.stringify(gameState))
    }
  }, [gameState])

  const shuffleDeck = useCallback((deck: Card[]) => {
    return [...deck].sort(() => Math.random() - 0.5)
  }, [])

  const startGame = useCallback((deck: Card[], teamNames: { A: string; B: string }, timeLeft: number) => {
    setGameState(prevState => {
      if (prevState.isPlaying) return prevState // Prevent re-starting if already playing
      return {
        ...prevState,
        deck: shuffleDeck(deck),
        currentRound: 1,
        teamNames,
        timeLeft,
        initialTimeLeft: timeLeft,
        scores: { A: 0, B: 0 },
        isPlaying: true,
        isBreak: false,
      }
    })
  }, [shuffleDeck])

  const nextTurn = useCallback(() => {
    console.log("Next turn ", gameState.initialTimeLeft)
    setGameState(prevState => ({
      ...prevState,
      isBreak: true,
      timeLeft: prevState.initialTimeLeft,
    }))
  }, [gameState.initialTimeLeft])

  const confirmNextTurn = useCallback(() => {
    setGameState(prevState => {
      const nextTeam = prevState.currentTeam === 'A' ? 'B' : 'A'
      let nextRound = prevState.currentRound
      
      if (nextTeam === 'A') {
        nextRound = prevState.currentRound + 1
      }

      if (nextRound > 3) {
        return {
          ...prevState,
          isPlaying: false,
          isBreak: false,
        }
      }

      return {
        ...prevState,
        currentTeam: nextTeam,
        currentRound: nextRound,
        timeLeft: prevState.initialTimeLeft,
        isBreak: false,
      }
    })
  }, [])

  const correctGuess = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      scores: {
        ...prevState.scores,
        [prevState.currentTeam]: prevState.scores[prevState.currentTeam] + 1,
      },
      deck: prevState.deck.slice(1),
    }))
  }, [])

  const skipCard = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      deck: [...prevState.deck.slice(1), prevState.deck[0]],
    }))
  }, [])

  const value = {
    gameState,
    setGameState,
    startGame,
    nextTurn,
    correctGuess,
    skipCard,
    confirmNextTurn,
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}
