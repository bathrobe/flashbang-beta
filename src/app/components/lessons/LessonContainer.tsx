'use client'
import { useState } from 'react'
import LessonAtom from './LessonAtom'
import LessonVideo from './LessonVideo'
import LessonReview from './LessonReview'

const LessonContainer = ({ lesson }: { lesson: any }) => {
  const [lessonPhase, setLessonPhase] = useState<'video' | 'review' | 'atom'>('video')
  const phases = ['video', 'review', 'atom']
  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-4">
        {phases.map((phase) => (
          <div
            key={phase}
            className={`mx-2 ${lessonPhase === phase ? 'border-b-2 border-blue-500' : ''}`}
          >
            {phase.charAt(0).toUpperCase() + phase.slice(1)}
          </div>
        ))}
      </div>
      {lessonPhase === 'video' && (
        <LessonVideo youTubeId={lesson.youTubeId} setLessonPhase={setLessonPhase} />
      )}
      {lessonPhase === 'review' && (
        <LessonReview review={lesson.review} setLessonPhase={setLessonPhase} />
      )}
      {lessonPhase === 'atom' && <LessonAtom lesson={lesson} />}
    </div>
  )
}

export default LessonContainer
