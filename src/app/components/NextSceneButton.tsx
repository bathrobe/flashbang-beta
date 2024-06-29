'use client'

import { useRouter } from 'next/navigation'
import { useSceneContext } from '@/app/contexts/SceneContext'
import { completeLesson } from '../lib/lessonActions/enrollmentActions'

const CompleteLessonButton: React.FC<{ courseSlug: string; lessonSlug: string }> = ({
  lessonSlug,
  courseSlug,
}) => {
  const router = useRouter()

  const handleCompleteLesson = () => {
    // todo: mark the lesson done in user profile
    completeLesson(lessonSlug)
    router.push(`/courses/${courseSlug}`)
  }

  return (
    <button
      className="w-full font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md bg-green-500 hover:bg-green-600 text-white"
      onClick={handleCompleteLesson}
    >
      Complete Lesson
    </button>
  )
}

const NextSceneButton: React.FC = () => {
  const { currentScene, setCurrentScene, scenes, courseSlug, lessonSlug } = useSceneContext()
  const lessonLength = scenes.length
  const isLastScene = currentScene === lessonLength - 1

  const handleNextScene = () => {
    setCurrentScene(currentScene + 1)
  }

  if (isLastScene) {
    return <CompleteLessonButton courseSlug={courseSlug} lessonSlug={lessonSlug} />
  }

  return (
    <button
      className="w-full font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md bg-blue-500 hover:bg-blue-600 text-white"
      onClick={handleNextScene}
    >
      Next Scene
    </button>
  )
}

export default NextSceneButton
