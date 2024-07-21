'use client'
import { useState } from 'react'
import AtomCard from '@/app/components/AtomCard'
import ReviewPhase from './ReviewPhase'

const LessonContainer = ({
  lesson,
  atom,
  flashcards,
}: {
  lesson: any
  atom: any
  flashcards: any[] | null | undefined
}) => {
  const [currentPhase, setCurrentPhase] = useState<number>(1)

  const handleAssign = () => {
    setCurrentPhase(4)
  }

  return (
    <div className="mt-8 w-[65ch] mx-auto">
      {/* Exposition Phase */}
      {lesson.exposition &&
        lesson.exposition.length > 0 &&
        lesson.exposition[0].blockType === 'richText' && (
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mb-8">
            <div dangerouslySetInnerHTML={{ __html: lesson.exposition[0].content_html || '' }} />
            {currentPhase === 1 && (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => setCurrentPhase(2)}
              >
                Continue to Review
              </button>
            )}
          </div>
        )}

      {/* Review Phase */}
      {currentPhase >= 2 && (
        <div className="mt-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Review</h2>
          {/* @ts-ignore */}
          <ReviewPhase setCurrentPhase={setCurrentPhase} flashcards={flashcards} />
        </div>
      )}

      {/* Atom Card Phase */}
      {currentPhase >= 3 && (
        <div className="mt-24 mb-48 flex justify-center items-center">
          <AtomCard title={lesson.title} atom={atom} onAssign={handleAssign} />
        </div>
      )}
    </div>
  )
}

export default LessonContainer
