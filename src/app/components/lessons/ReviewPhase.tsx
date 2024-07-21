'use client'
import { useState } from 'react'

interface Flashcard {
  title: string
  question: string
  answer: string
}

const ReviewPhase: React.FC<{
  flashcards: Flashcard[]
  setCurrentPhase: (phase: number) => void
}> = ({ flashcards, setCurrentPhase }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isReviewFinished, setIsReviewFinished] = useState(false)

  const handleNextQuestion = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleNextPhase = () => {
    setIsReviewFinished(true)
    setCurrentPhase(3)
    window.scrollBy({ top: 100, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      {flashcards.slice(0, currentIndex + 1).map((flashcard, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">{flashcard.title}</h3>
          <p className="mb-2">{flashcard.question}</p>
          <p className="mb-4">{flashcard.answer}</p>
        </div>
      ))}

      {currentIndex < flashcards.length - 1 ? (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={handleNextQuestion}
        >
          Next Question
        </button>
      ) : !isReviewFinished ? (
        <button
          className="mt-8 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          onClick={handleNextPhase}
        >
          Continue to Atom
        </button>
      ) : (
        <div>
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold text-green-600 mb-4">🎉 Congratulations! 🎉</h3>
            <p className="text-lg text-gray-700">You've successfully completed the review phase.</p>
            <p className="text-md text-gray-600 mt-4">Scroll down to add this atom to your deck.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewPhase
