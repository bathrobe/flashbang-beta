'use client'

import ReactPlayer from 'react-player'

const LessonVideo: React.FC<{
  lessonContent: { youTubeId?: string; expositionHtml?: string }
  setLessonPhase: (phase: 'lesson' | 'review' | 'atom') => void
}> = ({ lessonContent, setLessonPhase }) => {
  const { youTubeId, expositionHtml } = lessonContent

  return (
    <div className="flex flex-col items-center">
      <div className="video-container w-full max-w-4xl mx-auto">
        {youTubeId && (
          <div className="relative" style={{ paddingTop: '56.25%' }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${youTubeId}`}
              width="100%"
              height="100%"
              className="absolute top-0 left-0"
              controls
            />
          </div>
        )}
        {expositionHtml && (
          <div className="mt-8 w-[65ch] mx-auto text-lg text-slate-900 prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: expositionHtml }} />
          </div>
        )}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => setLessonPhase('review')}
      >
        Advance to Review Phase
      </button>
    </div>
  )
}

export default LessonVideo
