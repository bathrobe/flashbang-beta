'use client'

import React from 'react'
import Link from 'next/link'

const LessonCard: React.FC<{ course: any; lesson: any; userLesson: any }> = ({
  course,
  userLesson,
  lesson,
}) => {
  const { title, slug, atom, id } = lesson

  return (
    <Link href={`/lessons/${slug}`}>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow duration-300 relative">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {course.title && <p className="text-xs text-gray-500 mb-3">{course.title}</p>}
        {atom?.shortSummary_html && (
          <div
            className="text-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: atom.shortSummary_html }}
          />
        )}
      </div>
    </Link>
  )
}

export default LessonCard
