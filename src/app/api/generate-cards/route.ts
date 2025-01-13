import { NextResponse } from 'next/server'
import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'

export async function POST(req: Request) {
    const { topics, count } = await req.json()

    const cardSchema = z.array(
        z.object({
            text: z.string(),
            category: z.string()
        })
    )

    try {
        const cards = await generateObject({
            model: google('gemini-1.5-flash'),
            schema: cardSchema,
            prompt: `Generate ${count} unique cards for a party game similar to Monikers. Each card should have a text field and a category field based on these topics: ${topics.join(', ')}.`
        })

        console.log("Cards in API: ", cards.object)

        return NextResponse.json(cards.object)
    } catch (error) {
        console.error('Error generating cards:', error)
        return NextResponse.json({ error: 'Failed to generate cards' }, { status: 500 })
    }
}
