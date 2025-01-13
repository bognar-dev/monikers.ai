'use server'

import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const cardSchema = z.array(
  z.object({
    text: z.string(),
    category: z.string()
  })
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateCards(prevState: any, formData: FormData) {
  const topics = formData.get('topics')?.toString() || ''
  const count = parseInt(formData.get('cardCount')?.toString() || '30')
  const teamAName = formData.get('teamA')?.toString() || 'Team A'
  const teamBName = formData.get('teamB')?.toString() || 'Team B'
  const timeLeft = parseInt(formData.get('timeLeft')?.toString() || '60')

  try {
    const cards = await generateObject({
      model: google('gemini-1.5-flash'),
      schema: cardSchema,
      prompt: `Generate ${count} unique cards for a party game similar to Monikers. Each card should have a text field and a category field based on these topics: ${topics}.`
    })

    console.log("Generated cards:", cards.object)
    revalidatePath('/')
    return {
      success: true,
      error: '',
      cards: cards.object,
      teamNames: { A: teamAName, B: teamBName },
      timeLeft: timeLeft
    }
  } catch (error) {
    console.error('Error generating cards:', error)
    return {
      success: false,
      error: 'Failed to generate cards',
      cards: [],
      teamNames: {'A': 'Team A', 'B': 'Team B'},
      timeLeft: 60
    }
  }
}