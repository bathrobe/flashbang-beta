'use client'
import Link from 'next/link'
import LessonProgressCard from './LessonProgressCard'

const CompletedReview: React.FC<{ reviewedCards: any[] }> = ({ reviewedCards }) => {
  const uniqueLessons = Array.from(new Set(reviewedCards.map((card) => card.userLesson.lesson.id)))
    .map(
      (lessonId) =>
        reviewedCards.find((card) => card.userLesson.lesson.id === lessonId)?.userLesson,
    )
    .filter(Boolean)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Review Completed</h1>
      {uniqueLessons.map((userLesson) => (
        <LessonProgressCard
          key={userLesson.lesson.id}
          userLesson={userLesson}
          reviewedCards={reviewedCards}
        />
      ))}
      <div className="text-center mt-8">
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Back to Main Page
        </Link>
      </div>
    </div>
  )
}

export default CompletedReview
