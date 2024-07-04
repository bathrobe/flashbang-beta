'use client'
import { useState } from 'react'
import { useFlashcardContext } from '@/app/contexts/FlashcardContext'
import CardReview from '@/app/components/flashcards/CardReview'
import XPBonusScreen from '@/app/components/flashcards/XPBonusScreen'

export default function CardReviewContainer() {
  const { dueCards, reviewedCards, setReviewedCards, currentCardIndex, setCurrentCardIndex } =
    useFlashcardContext()

  if (dueCards.length === 0 && reviewedCards.length === 0) {
    return <div>No due cards available.</div>
  }

  if (dueCards.length === 0 && reviewedCards.length > 0) {
    return <XPBonusScreen reviewedCards={reviewedCards} />
  }

  return (
    <div className="flex my-16 justify-center">
      <div>
        <CardReview card={dueCards[currentCardIndex]} />
      </div>
    </div>
  )
}
