'use client'
import { useState } from 'react'
import dayjs from 'dayjs'
import { useUserContext } from '@/app/contexts/UserContext'
import CardReview from '@/app/components/flashcards/CardReview'

export default function InboxContainer() {
  const { dueCards, setDueCards } = useUserContext()
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [reviewedCards, setReviewedCards] = useState<any[]>([])

  const handleCardReviewed = (reviewedCard: any) => {
    setReviewedCards([...reviewedCards, reviewedCard])
    setDueCards(dueCards.filter((card) => card.id !== reviewedCard.id))
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % dueCards.length)
  }

  if (dueCards.length === 0 && reviewedCards.length === 0) {
    return <div>No due cards available.</div>
  }

  if (dueCards.length === 0 && reviewedCards.length > 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p>You've completed all your due cards for today</p>
        <div className="mt-8 flex flex-col">
          {reviewedCards.map((card) => (
            <div
              key={card.id}
              className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow duration-300 w-96 mx-auto"
            >
              <h3 className="text-lg font-semibold mb-2">{card.flashcard.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Lesson: {card.lesson.title}</p>
              <p className="text-sm text-gray-600 mb-1">
                Next due: {dayjs(card.current.due).format('MMMM D, YYYY')}
              </p>
              <p className="text-sm text-gray-600">
                Last review:{' '}
                {card.log[0]?.rating
                  ? ['Again', 'Hard', 'Good', 'Easy'][card.log[0].rating - 1]
                  : 'N/A'}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex my-16 justify-center">
      <CardReview
        card={dueCards[currentCardIndex]}
        reviewedCards={reviewedCards}
        setReviewedCards={setReviewedCards}
        currentCardIndex={currentCardIndex}
        handleCardReviewed={handleCardReviewed}
      />
    </div>
  )
}
