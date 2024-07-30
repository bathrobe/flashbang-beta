import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { authCheck } from '@/app/lib/auth'

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
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col items-center ">
        <div className="flex items-baseline space-x-4 mb-2">
          {lesson.course && (
            <h2 className="text-2xl font-semibold text-gray-700">{(lesson.course as any).title}</h2>
          )}
        </div>
        <h3 className="text-3xl font-bold text-gray-900">{lesson.title}</h3>
      </div>
      {children}
    </div>
  )
}
