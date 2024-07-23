'use client'
import { useState } from 'react'
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
        <p>You've completed all your due cards for today.</p>
      </div>
    )
  }

  return (
    <div className="flex my-16 justify-center">
      <div>
        <CardReview
          card={dueCards[currentCardIndex]}
          reviewedCards={reviewedCards}
          setReviewedCards={setReviewedCards}
          currentCardIndex={currentCardIndex}
          handleCardReviewed={handleCardReviewed}
        />
      </div>
    </div>
  )
}
