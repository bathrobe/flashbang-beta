import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { authCheck } from '@/app/lib/auth'
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
  return (
    <div className="">
      <LessonContainer lesson={lesson} />
    </div>
  )
}
