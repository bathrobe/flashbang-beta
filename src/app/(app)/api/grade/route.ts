import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { generateGrade } from '@/app/(app)/prompts/grade'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const request = await req.json()
  const { userAnswer, question, answer, feedback } = request
  const gradePrompt = generateGrade(question, answer, userAnswer, feedback)

  const { text } = await generateText({
    model: openai('gpt-4'),
    messages: [
      {
        role: 'system',
        content:
          'You are a grader of flashcards. Respond with a number between 0 and 3, inclusive.',
      },
      { role: 'user', content: gradePrompt },
    ],
  })

  return new Response(JSON.stringify({ grade: parseInt(text) }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
