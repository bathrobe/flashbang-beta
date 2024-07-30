import { getLastXP, calculateXP, getNewXP } from '@/app/lib/flashcards'

export default function CompletedReview({ reviewedCards }: { reviewedCards: any[] }) {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
      <p>You've completed all your due cards for today:</p>
      <ul>
        {reviewedCards.map((card) => (
          <li key={card.id}>
            <span>{card.flashcard.title}</span>
            <div>Last XP: {getLastXP(card)}</div>
            <div>New XP: {card.xp}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
