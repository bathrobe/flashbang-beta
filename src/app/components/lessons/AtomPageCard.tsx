'use client'
import React, { useState } from 'react'
import { useUserContext } from '@/app/contexts/UserContext'

const AtomPageCard: React.FC<{ lesson: any }> = ({ lesson }) => {
  console.log(lesson)
  const { xp } = lesson
  const { lesson: lessonData } = lesson
  const [currentView, setCurrentView] = useState('summary')
  const views = ['summary', 'details', 'source', 'flashcards']
  const { user } = useUserContext()

  const renderSourceInfo = () => (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">{lessonData.atom.source?.title}</p>
      <p>
        {lessonData.atom.source?.author}, {lessonData.atom.source?.institution}
      </p>
      {lessonData.atom.specificSection && <p>{lessonData.atom.specificSection}</p>}
      {lessonData.atom.source?.url && (
        <a
          href={lessonData.atom.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Source
        </a>
      )}
    </div>
  )

  const renderFlashcards = () => {
    const userFlashcards = user?.flashcards?.filter(
      (flashcard: any) => flashcard.lesson.id === lesson.id,
    )
    return (
      <div className="space-y-4">
        {userFlashcards?.map((flashcard: any) => (
          <div key={flashcard.id} className="border p-4 rounded">
            <p className="font-bold">{flashcard.flashcard.front}</p>
            <p className="mt-2">{flashcard.flashcard.back}</p>
            <p className="mt-2 text-sm text-gray-600">
              Stability: {flashcard.current.stability.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg shadow-md overflow-hidden w-full max-w-2xl mx-auto">
      <div className="p-4">
        <h2 className="text-xl font-medium text-center text-gray-600 mb-3">{lessonData.title}</h2>
        <div className="text-center text-2xl font-bold text-blue-600 mb-3">XP: {lesson.xp}</div>
        <div className="flex flex-row items-center justify-center mb-3 space-x-2">
          {views.map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`px-3 py-1 rounded-full text-sm ${
                currentView === view ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
        <div
          className="prose prose-sm px-4 mx-auto overflow-y-auto"
          style={{ maxHeight: '20rem', width: '100%' }}
        >
          {currentView === 'summary' && (
            <div dangerouslySetInnerHTML={{ __html: lessonData.atom?.shortSummary_html || '' }} />
          )}
          {currentView === 'details' && (
            <div dangerouslySetInnerHTML={{ __html: lessonData.atom?.mediumSummary_html || '' }} />
          )}
          {currentView === 'source' && renderSourceInfo()}
          {currentView === 'flashcards' && renderFlashcards()}
        </div>
      </div>
    </div>
  )
}

export default AtomPageCard
