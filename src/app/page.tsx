"use client"
import GameSetup from '@/components/GameSetup'
import Game from '@/components/Game'
import { GameProvider } from '@/components/GameContext'

export default function Preview() {
  return (
    <div className="flex flex-col">
      
      
      <GameProvider>
        <GameSetup />
        <Game />
      </GameProvider>
    </div>
  )
}



