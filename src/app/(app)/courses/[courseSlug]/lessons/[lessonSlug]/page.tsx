import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { authCheck } from '@/app/lib/authHelpers'
import LessonContainer from '@/app/components/lessons/LessonContainer'

export const dynamic = 'force-dynamic'

export default async function LessonPage({ params }: { params: any }) {
  await authCheck()
  // @ts-ignore
  const { lessonSlug } = params

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const lessonData = await payload.find({
    collection: 'lessons',
    where: {
      slug: {
        equals: lessonSlug,
      },
    },
  })

  const { docs: lessonDocs } = lessonData
  const lesson = lessonDocs[0]
  const { flashcards, atom } = lesson
  return (
    <div>
      {lesson.course && (
        <h2 className="text-xl font-semibold mb-2 text-center text-gray-600">
          {/* @ts-ignore */}
          {lesson.course?.title}
        </h2>
      )}
      <h1 className="text-3xl font-bold mb-24 mt-8 text-center">
        <span className="text-gray-500 text-2xl mr-2">Lesson {lesson.number}:</span>
        {lesson.title}
      </h1>
      <LessonContainer lesson={lesson} atom={atom} flashcards={flashcards} />
    </div>
  )
}
