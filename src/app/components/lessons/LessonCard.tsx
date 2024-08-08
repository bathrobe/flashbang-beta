'use client'

import React from 'react'
import Link from 'next/link'

const LessonCard: React.FC<{ course: any; lesson: any; userLesson: any; dueCards: boolean }> = ({
  course,
  userLesson,
  lesson,
  dueCards,
}) => {
  const { title, slug, atom, id } = lesson
  const isDisabled = dueCards
  const isCompleted = userLesson !== undefined

  const cardContent = (
    <div
      className={`bg-white shadow-md rounded-lg p-6 mb-4 transition-shadow duration-300 relative ${
        isDisabled ? 'opacity-50' : 'hover:shadow-lg'
      }`}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {course.title && <p className="text-xs text-gray-500 mb-3">{course.title}</p>}
      {atom?.shortSummary_html && (
        <div
          className="text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: atom.shortSummary_html }}
        />
      )}
      {isCompleted && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Completed
        </div>
      )}
    </div>
  )

  return isDisabled ? (
    <div>{cardContent}</div>
  ) : (
    <Link href={`/lessons/${slug}`}>{cardContent}</Link>
  )
}

export default LessonCard
