'use client'
import { useState } from 'react'
import LessonAtom from './LessonAtom'
import LessonVideo from './LessonVideo'
import LessonReview from './LessonReview'

const LessonContainer = ({ lesson }: { lesson: any }) => {
  const [lessonPhase, setLessonPhase] = useState<'lesson' | 'review' | 'atom'>('lesson')
  const phases = ['lesson', 'review', 'atom']

  const handlePhaseChange = (phase: 'lesson' | 'review' | 'atom') => setLessonPhase(phase)

  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-4">
        {phases.map((phase) => (
          <button
            key={phase}
            onClick={() => setLessonPhase(phase as 'lesson' | 'review' | 'atom')}
            className={`mx-2 px-3 py-1 rounded ${
              lessonPhase === phase
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {phase.charAt(0).toUpperCase() + phase.slice(1)}
          </button>
        ))}
      </div>
      {lessonPhase === 'lesson' && (
        <LessonVideo
          lessonContent={{ youTubeId: lesson.youTubeId, expositionHtml: lesson.exposition_html }}
          setLessonPhase={setLessonPhase}
        />
      )}
      {lessonPhase === 'review' && (
        <>
          {/* @ts-ignore */}
          <LessonReview review={lesson.review} setLessonPhase={handlePhaseChange} />
        </>
      )}
      {lessonPhase === 'atom' && <LessonAtom lesson={lesson} />}
    </div>
  )
}

export default LessonContainer
