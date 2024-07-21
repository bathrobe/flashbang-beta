'use client'
import { useUserContext } from '@/app/contexts/UserContext'
import CardReview from '@/app/components/flashcards/CardReview'
import XPBonusScreen from '@/app/components/flashcards/XPBonusScreen'

export default function CardReviewContainer() {
  const { dueCards, reviewedCards, currentCardIndex, currentLevel, currentXP } = useUserContext()

  if (dueCards.length === 0 && reviewedCards.length === 0) {
    return <div>No due cards available.</div>
  }

  if (dueCards.length === 0 && reviewedCards.length > 0) {
    return (
      <XPBonusScreen
        currentLevel={currentLevel}
        currentXP={currentXP}
        reviewedCards={reviewedCards}
      />
    )
  }

  return (
    <div className="flex my-16 justify-center">
      <div>
        <CardReview card={dueCards[currentCardIndex]} />
      </div>
    </div>
  )
}
