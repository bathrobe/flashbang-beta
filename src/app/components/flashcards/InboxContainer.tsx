'use client'
import { useState } from 'react'
import { useFlashcardContext } from '@/app/contexts/FlashcardContext'
import CardReview from '@/app/components/flashcards/CardReview'

export default function CardReviewContainer() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const { dueCards } = useFlashcardContext()
  // Check if there are no due cards
  if (dueCards.length === 0 || !dueCards[currentCardIndex]) {
    return <div>No due cards available.</div>
  }

  return (
    <>
      <div className="flex my-16 justify-center">
        <div>
          <CardReview
            card={dueCards[currentCardIndex]}
            currentCardIndex={currentCardIndex}
            setCurrentCardIndex={setCurrentCardIndex}
          />
        </div>
      </div>
    </>
  )
}
