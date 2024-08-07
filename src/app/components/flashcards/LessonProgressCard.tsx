import {
  calculateAverageStability,
  getLastLogAverageStability,
  getLatestLogStability,
} from '@/app/lib/flashcardHelpers'
import { updateLearningPhase } from '@/app/lib/lessons'

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
  const isLevelUp = averageStability >= (userLesson?.currentPhase?.stabilityThreshold ?? Infinity)

  if (isLevelUp) {
    updateLearningPhase(userLesson)
  }

  return (
    <div key={userLesson?.lesson?.id} className="mb-6 p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">{userLesson?.lesson?.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{userLesson?.currentPhase?.name}</p>
      <p className="text-sm text-gray-600 mb-2">
        To next level: {userLesson?.currentPhase?.stabilityThreshold}
      </p>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
              Stability Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-teal-600">
              {(
                (averageStability / (userLesson?.currentPhase?.stabilityThreshold ?? 1)) *
                100
              ).toFixed(2)}
              %
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
          <div
            style={{
              width: `${
                (averageStability / (userLesson?.currentPhase?.stabilityThreshold ?? 1)) * 100
              }%`,
              transition: 'width 1s ease-in-out',
            }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
          >
            <div
              style={{
                width: `${(lastLogAverageStability / averageStability) * 100}%`,
              }}
              className="h-full bg-teal-600"
            ></div>
          </div>
        </div>
      </div>
      <p className="text-sm mb-2">
        Change in Stability:{' '}
        {averageStability - lastLogAverageStability >= 0 ? (
          <span className="text-green-600">
            +{(averageStability - lastLogAverageStability).toFixed(2)}
          </span>
        ) : (
          <span className="text-red-600">
            -{Math.abs(averageStability - lastLogAverageStability).toFixed(2)}
          </span>
        )}
        {isLevelUp && (
          <span className="ml-2 text-yellow-500 font-bold">
            Level up! New stage: {(userLesson?.currentPhase?.stage ?? 0) + 1}
          </span>
        )}
      </p>
      <ul className="list-disc pl-5">
        {reviewedCardsForLesson.map((card: any) => (
          <li key={card.id} className="text-sm">
            {card.flashcard?.question || 'Unnamed Card'}
            <div>Change in stability: {card.current.stability - getLatestLogStability(card)}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
