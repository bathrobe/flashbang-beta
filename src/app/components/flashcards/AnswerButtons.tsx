'use client'

import { useRouter } from 'next/navigation'
import { answerCard } from '@/app/lib/flashcards/flashcardActions'
import { Rating } from 'ts-fsrs'
import { useFlashcardContext } from '@/app/contexts/FlashcardContext'

export default function AnswerButtons({
  handleInputChange,
  currentCardIndex,
  result,
  setCompletion,
  setResult,
  input,
}: {
  handleInputChange: any
  currentCardIndex: any
  result: any
  setCompletion: any
  setResult: any
  setCurrentCardIndex: any
  input: any
}) {
  const router = useRouter()
  const { dueCards, setDueCards } = useFlashcardContext()
  const ratings: string[] = ['Again', 'Hard', 'Good', 'Easy']
  const buttonColors = ['bg-red-800', 'bg-yellow-800', 'bg-green-800', 'bg-blue-800']

  if (result === '') {
    return null
  }

  const answerButtonArray = ratings
    .map((rating, index) => {
      return (
        <button
          key={index}
          className={`mx-2 ${
            buttonColors[index]
          } px-4 py-2 rounded-md text-white font-semibold transition-colors duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
            buttonColors[index].split('-')[1]
          }-500`}
          onClick={async () => {
            await answerCard(
              dueCards[currentCardIndex],
              input,
              Rating[rating as keyof typeof Rating],
            )
            setDueCards(dueCards.filter((card: any) => card.id !== dueCards[currentCardIndex].id))
            setCompletion('')
            handleInputChange({ target: { value: '' } })
            setResult('')
            router.refresh()
            // setCurrentCardIndex(currentCardIndex + 1)
          }}
        >
          {rating}
        </button>
      )
    })
    .filter((_, index) => result == index || result == index + 1) // llm score corresponds to index of ratings array

  return <div style={{ display: 'flex', justifyContent: 'center' }}>{answerButtonArray}</div>
}
