import { Suspense, useActionState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '@/components/GameContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Sparkles } from 'lucide-react'
import { generateCards } from '@/actions/getCards'
import {useFormStatus } from 'react-dom'
import { Slider } from './ui/slider'

// Loading button component
function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button
      type="submit"
      className="w-full text-xl h-12"
      variant="default"
      disabled={pending}
    >
      {pending ? (
        <>
          <span className="animate-spin mr-2">⚡</span>
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2" />
          Start the Magic!
        </>
      )}
    </Button>
  )
}

const initialState = {
  success: false,
  error: '',
  cards: [],
  teamNames: {  'A': 'Team A', 'B': 'Team B'},
  timeLeft: 60
}

export default function GameSetup() {
  const { gameState, startGame } = useGame()
  const [state, formAction] = useActionState(generateCards, initialState)
  // Start game if cards were generated successfully
  if (state.success && state.cards && state.teamNames) {
    startGame(state.cards, state.teamNames,state.timeLeft)
  }

  if (gameState.isPlaying) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="pt-20 text-6xl sm:text-7xl md:text-8xl text-black w-full text-center font-calendas italic">
        monikers.ai
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl text-center text-background">
            <Sparkles className="inline-block mr-2 text-background" />
            Game Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={formAction} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="teamA">Team 1 Name</Label>
              <Input
                id="teamA"
                name="teamA"
                defaultValue="Team A"
                className="mt-1 bg-background"
                placeholder="Enter team name..."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="teamB">Team 2 Name</Label>
              <Input
                id="teamB"
                name="teamB"
                defaultValue="Team B"
                className="mt-1"
                placeholder="Enter team name..."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="timeLeft">Time for each round (in seconds)</Label>
              <Input
                id="timeLeft"
                name="timeLeft"
                defaultValue="60"
                className="mt-1"
                placeholder="Enter time for each round..."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="topics">Topics (comma-separated)</Label>
              <Input
                id="topics"
                name="topics"
                className="mt-1"
                placeholder="Movies, Sports, Countries..."
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <div className="flex justify-between">
              <Label htmlFor="cardCount">Number of Cards</Label>
              <span className="text-muted-foreground">
                <span id="cardCountDisplay">30</span>
              </span>
              </div>
              <Slider
              id="cardCount"
              name="cardCount"
              defaultValue={[30]}
              min={10}
              max={100}
              step={1}
              className="mt-2"
              onValueChange={(value) => {
                const display = document.getElementById('cardCountDisplay')
                if (display) display.textContent = value[0].toString()
              }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <Suspense>
                <SubmitButton />
              </Suspense>
            </motion.div>

            {state.error && (
              <p className="text-red-500 text-center">{state.error}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}