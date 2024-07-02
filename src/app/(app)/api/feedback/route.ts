import { streamText } from 'ai'
import { feedbackSystemPrompt, feedbackUserPrompt } from '@/app/(app)/prompts/feedback'
import { openai } from '@ai-sdk/openai'

// Create an OpenAI API client (that's edge friendly!)

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  // Get the prompt from the request body
  const request = await req.json()
  const { prompt, question, answer } = request
  const res = await streamText({
    model: openai('gpt-4'),
    messages: [
      { role: 'system', content: feedbackSystemPrompt },
      { role: 'user', content: feedbackUserPrompt(question, answer, prompt) },
    ],
  })

  return res.toAIStreamResponse()
}
