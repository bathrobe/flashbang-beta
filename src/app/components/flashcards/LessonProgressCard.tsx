import { calculateAverageStability, getLastLogAverageStability } from '@/app/lib/flashcardHelpers'

export default function LessonProgressCard({
  userLesson,
  reviewedCards,
}: {
  userLesson: any
  reviewedCards: any[]
}) {
  const reviewedCardsForLesson = reviewedCards.filter(
    (card: any) => card.userLesson.lesson.id === userLesson?.lesson?.id,
  )
  const averageStability = calculateAverageStability(reviewedCardsForLesson)
  const lastLogAverageStability = getLastLogAverageStability(reviewedCardsForLesson)
  const stabilityChange = averageStability - lastLogAverageStability

  return (
    <div key={userLesson?.lesson?.id} className="mb-6 p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{userLesson?.lesson?.title}</h2>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm">Average Stability:</span>
        <span className="text-sm font-semibold">{averageStability.toFixed(2)}</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full mb-2">
        <div
          style={{ width: `${Math.min(averageStability * 10, 100)}%` }}
          className="h-full bg-blue-500 rounded-full"
        ></div>
      </div>
      <div className="text-sm mb-4">
        Stability Change:
        <span className={stabilityChange >= 0 ? 'text-green-600 ml-1' : 'text-red-600 ml-1'}>
          {stabilityChange >= 0 ? '+' : '-'}
          {Math.abs(stabilityChange).toFixed(2)}
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-2">Reviewed Cards</h3>
      <ul className="list-disc pl-5">
        {reviewedCardsForLesson.map((card: any) => (
          <li key={card.id} className="text-sm mb-1">
            {card.flashcard?.title || 'Unnamed Card'}
          </li>
        ))}
      </ul>
    </div>
  )
}
