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
    <div className="">
      <a href={`${params.lessonSlug}/video`} className="block mb-4 text-blue-500 hover:underline">
        Watch Video
      </a>
      <LessonContainer lesson={lesson} atom={atom} flashcards={flashcards} />
    </div>
  )
}
