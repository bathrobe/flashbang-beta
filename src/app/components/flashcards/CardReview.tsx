'use client'

import { useCompletion } from 'ai/react'
import { useState } from 'react'
import AnswerButtons from '@/app/components/flashcards/AnswerButtons'

export default function CardReview({ card }: { card: any }) {
  const [result, setResult] = useState<any>(null)
  const [isGrading, setIsGrading] = useState(false)
  const [whenSeeCardAgain, setWhenSeeCardAgain] = useState(null)
  const {
    completion,
    setCompletion,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    error,
    isLoading,
  } = useCompletion({
    api: '/api/feedback',
    onFinish: async (prompt, completion) => {
      setIsGrading(true)
      const grade = await fetch('/api/grade', {
        method: 'POST',
        body: JSON.stringify({
          feedback: completion,
          userAnswer: input,
          question: card?.flashcard?.question,
          answer: card?.flashcard?.answer,
        }),
      })

      const gradeResult = await grade.json()
      setResult(gradeResult.grade)
      setIsGrading(false)
    },
    body: {
      question: card?.flashcard?.question,
      answer: card?.flashcard?.answer,
    },
  })

  return (
    <div className="flex flex-col items-center w-full">
      <div className="my-4 text-center">
        <h2 className="text-xl font-semibold mb-4">{card?.flashcard?.question}</h2>
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
      {isLoading && <div className="w-full p-4 text-center text-blue-500">Loading...</div>}
      {isGrading && <div className="w-full p-4 text-center text-blue-500">Grading...</div>}
      <div className="w-full p-4 text-center max-w-[65ch] break-words mb-4">{completion}</div>
      <AnswerButtons
        setCompletion={setCompletion}
        result={result}
        input={input}
        setInput={setInput}
        setResult={setResult}
      />
    </div>
  )
}
