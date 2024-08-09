'use client'

interface Card {
  lesson: {
    id: string
    title: string
    learningPhase: {
      stabilityThreshold: number
      name: string
    }
  }
  current: {
    stability: number
  }
}

interface LessonProgressProps {
  cardsWithStability: Card[]
}

const LessonProgress: React.FC<LessonProgressProps> = ({ cardsWithStability }) => {
  const lessonMap = new Map()

  cardsWithStability.forEach((card) => {
    if (!lessonMap.has(card.lesson.id)) {
      lessonMap.set(card.lesson.id, {
        title: card.lesson.title,
        totalStability: 0,
        cardCount: 0,
      })
    }
    const lessonData = lessonMap.get(card.lesson.id)
    lessonData.totalStability += card.current.stability
    lessonData.cardCount++
  })

  const lessons = Array.from(lessonMap.values()).map((lesson) => ({
    ...lesson,
    averageStability: lesson.totalStability / lesson.cardCount,
  }))

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Lessons Progress</h3>
      <div className="space-y-4">
        {lessons.map((lesson, index) => {
          return (
            <div
              key={index}
              className="bg-white shadow-sm rounded-lg p-4 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-gray-700">{lesson.title}</h4>
                <span className="text-sm font-medium text-gray-500">
                  {lesson.cardCount} card{lesson.cardCount !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-sm font-medium text-gray-600">
                  Average Stability: {lesson.averageStability.toFixed(2)}
                </div>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-400"
                  style={{ width: `${Math.min(lesson.averageStability * 10, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Progress: {(lesson.averageStability * 10).toFixed(1)}%
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LessonProgress
