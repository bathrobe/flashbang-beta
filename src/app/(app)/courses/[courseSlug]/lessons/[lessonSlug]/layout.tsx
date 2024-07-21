import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { authCheck } from '@/app/lib/authHelpers'

export const dynamic = 'force-dynamic'

export default async function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) {
  await authCheck()
  const { lessonSlug } = params

  const payload = await getPayloadHMR({ config: configPromise })

  const lessonData = await payload.find({
    collection: 'lessons',
    where: { slug: { equals: lessonSlug } },
  })

  const lesson = lessonData.docs[0]

  return (
    <div className=" mx-auto">
      {lesson.course && (
        <h2 className="text-xl font-semibold mb-2 text-center text-gray-600">
          {(lesson.course as any).title}
        </h2>
      )}
      <h1 className="text-3xl font-bold mb-16 mt-4 text-center">
        <span className="text-gray-500 text-2xl mr-2">Lesson {lesson.number}:</span>
        {lesson.title}
      </h1>
      {children}
    </div>
  )
}
