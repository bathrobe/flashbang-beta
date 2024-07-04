'use client'

import { useRouter } from 'next/navigation'
import { answerCard } from '@/app/lib/flashcards/flashcardActions'
import { Rating } from 'ts-fsrs'
import { useFlashcardContext } from '@/app/contexts/FlashcardContext'

const AnswerButtons: any = ({ setCompletion, result, input, setResult }: any) => {
  const router = useRouter()
  const {
    dueCards,
    setDueCards,
    reviewedCards,
    setReviewedCards,
    currentCardIndex,
    setCurrentCardIndex,
  } = useFlashcardContext()
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
            setCurrentCardIndex(currentCardIndex + 1)
            setDueCards(dueCards.filter((card: any) => card.id !== dueCards[currentCardIndex].id))
            setReviewedCards([...reviewedCards, dueCards[currentCardIndex]])
            setCompletion('')
            setResult(null)
            router.refresh()
          }}
        >
          {rating}
        </button>
      )
    })

  return <div style={{ display: 'flex', justifyContent: 'center' }}>{answerButtonArray}</div>
}

export default AnswerButtons
