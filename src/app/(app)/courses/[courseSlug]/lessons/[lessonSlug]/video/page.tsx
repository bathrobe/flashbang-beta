import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import LessonVideo from '@/app/components/lessons/LessonVideo'

export const dynamic = 'force-dynamic'

const VideoPage = async ({ params }: { params: { lessonSlug: string } }) => {
  const { lessonSlug } = params
  const payload = await getPayloadHMR({ config: configPromise })

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

  return <LessonVideo lesson={lesson} />
}

export default VideoPage
