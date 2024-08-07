'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { completeLesson } from '@/app/lib/lessons'
import { getDueCards } from '@/app/lib/flashcards'
import { useUserContext } from '@/app/contexts/UserContext'

export const LessonAtomCard: React.FC<{
  lesson: any
  onAssign: () => Promise<void>
  isAssigned: boolean
}> = ({ lesson, onAssign, isAssigned }) => {
  const [currentView, setCurrentView] = useState('summary')
  const [isAssigning, setIsAssigning] = useState(false)
  const views = ['summary', 'details', 'source']
  const { userLessons } = useUserContext()

  const renderSourceInfo = () => (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">{lesson.atom.source?.title}</p>
      <p>
        {lesson.atom.source?.author}, {lesson.atom.source?.institution}
      </p>
      {lesson.atom.specificSection && <p>{lesson.atom.specificSection}</p>}
      {lesson.atom.source?.url && (
        <a
          href={lesson.atom.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Source
        </a>
      )}
    </div>
  )

  const isAlreadyAssigned = userLessons.some(
    (userLesson: any) => userLesson.lesson.id === lesson.id,
  )

  const handleAssign = async () => {
    setIsAssigning(true)
    await onAssign()
    setIsAssigning(false)
  }

  return (
    <div
      className="bg-white border-2 border-gray-300 rounded-lg shadow-md overflow-hidden w-full max-w-2xl mx-auto"
      style={{ width: '32rem' }}
    >
      <div className="p-4">
        <h2 className="text-xl font-medium text-center text-gray-600 mb-3">{lesson.title}</h2>
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
            <div
              className="mx-auto"
              dangerouslySetInnerHTML={{ __html: lesson.atom.shortSummary_html || '' }}
            />
          )}
          {currentView === 'details' && (
            <div
              className="mx-auto"
              dangerouslySetInnerHTML={{ __html: lesson.atom.mediumSummary_html || '' }}
            />
          )}
          {currentView === 'source' && renderSourceInfo()}
        </div>
        <div className="mt-4 text-center">
          <button
            disabled={isAssigned || isAlreadyAssigned || isAssigning}
            onClick={handleAssign}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
          >
            {isAssigning ? 'Assigning...' : 'Assign'}
          </button>
        </div>
      </div>
    </div>
  )
}

const LessonAtom: React.FC<{ lesson: any }> = ({ lesson }) => {
  const [isAssigned, setIsAssigned] = useState(false)
  const { setDueCards, user, setUser } = useUserContext()
  const handleAssign = async () => {
    completeLesson(lesson)
    setIsAssigned(true)
    setDueCards(await getDueCards(user))
    // router.refresh()
  }

  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Congratulations. You've gained a new atom.
      </h1>
      <p className="text-xl text-center text-gray-600 mb-4">
        Click 'Assign' to add it to your deck.
      </p>
      <div className="flex flex-col items-center justify-center">
        <LessonAtomCard lesson={lesson} onAssign={handleAssign} isAssigned={isAssigned} />
        {isAssigned && (
          <button
            onClick={() => {
              router.push(`/`)
            }}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
          >
            Next Lesson
          </button>
        )}
      </div>
    </div>
  )
}

export default LessonAtom
