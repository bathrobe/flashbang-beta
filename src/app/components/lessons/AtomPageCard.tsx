'use client'
import React from 'react'
import { calculateRetrievability } from '@/app/lib/flashcardHelpers'
import dayjs from 'dayjs'
import { calculateAverageStability } from '@/app/lib/flashcardHelpers'
const AtomPageCard: React.FC<{ userLesson: any; userFlashcards: any }> = ({
  userLesson,
  userFlashcards,
}) => {
  const { lesson: lessonData } = userLesson

  const averageStability = calculateAverageStability(userFlashcards)
  const renderSourceInfo = () => (
    <div className="text-sm">
      <div className="text-gray-700">
        {lessonData.atom.source?.url ? (
          <a
            href={lessonData.atom.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-500 hover:underline"
          >
            {lessonData.atom.source?.title}
          </a>
        ) : (
          <span className="font-semibold">{lessonData.atom.source?.title}</span>
        )}
        {lessonData.atom.source?.author && `, ${lessonData.atom.source.author}`}
        {lessonData.atom.source?.institution && `, ${lessonData.atom.source.institution}`}
        {lessonData.atom.specificSection && (
          <div className="text-gray-600">{lessonData.atom.specificSection}</div>
        )}
      </div>
    </div>
  )

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden w-full max-w-2xl mx-auto">
      <div className="p-6 relative">
        <div className="absolute top-0 right-0 p-2 bg-blue-100 rounded-bl-lg">
          <p className="text-sm font-semibold text-blue-800">
            Avg Stability: {averageStability.toFixed(2)}
          </p>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{lessonData.title}</h2>
        <div
          className="text-gray-600 my-4"
          dangerouslySetInnerHTML={{ __html: lessonData.atom?.shortSummary_html || '' }}
        />

        <div className="prose prose-sm">{renderSourceInfo()}</div>
      </div>
    </div>
  )
}

export default AtomPageCard
