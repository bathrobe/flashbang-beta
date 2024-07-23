'use client'

import { answerCard } from '@/app/lib/flashcards/flashcardActions'
import { Rating } from 'ts-fsrs'
import { useUserContext } from '@/app/contexts/UserContext'

const AnswerButtons: any = ({
  reviewedCards,
  setReviewedCards,
  setCompletion,
  result,
  input,
  setResult,
  setInput,
  currentCardIndex,
}: any) => {
  const { dueCards, setDueCards } = useUserContext()
  const ratings: string[] = ['Again', 'Hard', 'Good', 'Easy']
  const buttonColors = ['bg-red-800', 'bg-yellow-800', 'bg-green-800', 'bg-blue-800']

  if (result === null || result === undefined) {
    return null
  }

  const answerButtonArray = ratings
    .filter((_, index) => result == index || result == index + 1) // llm score corresponds to index of ratings array
    .map((rating, index) => {
      const colorIndex = ratings.indexOf(rating)
      return (
        <button
          key={index}
          className={`mx-2 ${
            buttonColors[colorIndex]
          } px-4 py-2 rounded-md text-white font-semibold transition-colors duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
            buttonColors[colorIndex].split('-')[1]
          }-500`}
          onClick={async () => {
            await answerCard(
              dueCards[currentCardIndex],
              input,
              Rating[rating as keyof typeof Rating],
            )
            setDueCards(dueCards.filter((card: any) => card.id !== dueCards[currentCardIndex].id))
            setReviewedCards([...reviewedCards, dueCards[currentCardIndex]])
            setCompletion('')
            setInput('')
            setResult(null)
          }}
        >
          {rating}
        </button>
      )
    })

  return <div style={{ display: 'flex', justifyContent: 'center' }}>{answerButtonArray}</div>
}

export default AnswerButtons
