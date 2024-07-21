'use client'

import { FC } from 'react'
import ReactPlayer from 'react-player'

interface LessonVideoProps {
  lesson: {
    youTubeId?: string
    title?: string
    number?: number
    course?: { title?: string }
  }
}

const LessonVideo: FC<LessonVideoProps> = ({ lesson }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-4">
      <div className="video-container w-full max-w-4xl mx-auto">
        {lesson?.youTubeId && (
          <div className="relative" style={{ paddingTop: '56.25%' }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${lesson.youTubeId}`}
              width="100%"
              height="100%"
              className="absolute top-0 left-0"
              controls
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default LessonVideo
