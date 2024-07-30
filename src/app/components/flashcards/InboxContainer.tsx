'use client'
import { useState } from 'react'
import { useUserContext } from '@/app/contexts/UserContext'
import CompletedReview from '@/app/components/flashcards/CompletedReview'
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
    return <CompletedReview reviewedCards={reviewedCards} />
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
