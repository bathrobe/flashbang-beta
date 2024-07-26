'use client'

import React from 'react'
import Link from 'next/link'
import { useUserContext } from '@/app/contexts/UserContext'

const LessonCard: React.FC<{ course: any; lesson: any; user: any }> = ({
  course,
  lesson,
  user,
}) => {
  const { title, slug, atom, id } = lesson
  const userLesson = user.lessons.find((userLesson: any) => userLesson.lesson.id === id)

  return (
    <Link href={`/lessons/${slug}`}>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow duration-300 relative">
        {userLesson && userLesson.isCompleted && (
          <div className="absolute top-2 right-2">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        )}
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
