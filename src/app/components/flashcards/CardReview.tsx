'use client'

import { useCompletion } from 'ai/react'
import { useState } from 'react'
import AnswerButtons from '@/app/components/flashcards/AnswerButtons'

export default function CardReview({ card, currentCardIndex, setCurrentCardIndex }: any) {
  const [result, setResult] = useState<any>(null)
  const { completion, setCompletion, input, handleInputChange, handleSubmit, error } =
    useCompletion({
      api: '/api/feedback',
      onFinish: async (prompt, completion) => {
        const grade = await fetch('/api/grade', {
          method: 'POST',
          body: JSON.stringify({
            feedback: completion,
            userAnswer: input,
            question: card.flashcard.question,
            answer: card.flashcard.answer,
          }),
        })

        const gradeResult = await grade.json()
        setResult(gradeResult[0])
      },
      body: {
        question: card.flashcard.question,
        answer: card.flashcard.answer,
      },
    })
  return (
    <div className="flex flex-col items-center w-full">
      <div className="my-4 text-center">
        <h2 className="text-xl font-semibold mb-4">{card.flashcard.question}</h2>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          className="w-full p-3 mb-8 border border-gray-300 rounded-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-lg"
          value={input}
          placeholder="Answer here..."
          onChange={handleInputChange}
        />
      </form>
      {error && <div className="w-full p-4 text-center bg-red-500 text-white">{error.message}</div>}
      <div className="w-full p-4 text-center max-w-[65ch] break-words mb-4">{completion}</div>
      <AnswerButtons
        setCompletion={setCompletion}
        setCurrentCardIndex={setCurrentCardIndex}
        result={result}
        input={input}
        setResult={setResult}
        currentCardIndex={currentCardIndex}
        handleInputChange={handleInputChange}
      />
    </div>
  )
}
