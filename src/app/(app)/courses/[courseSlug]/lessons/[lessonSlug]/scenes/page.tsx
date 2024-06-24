import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import SceneContainer from '@/app/components/SceneContainer'
import authCheck from '@/app/lib/authCheck'

export const dynamic = 'force-dynamic'

export default async function Scenes({ params }: { params: any }) {
  const user = await authCheck()
  const { userLessons } = user
  const { lessonSlug } = params
  console.log(userLessons)
  const hasEnrolledInLesson = userLessons?.some((lesson: any) => lesson.lesson.slug === lessonSlug)

  if (!hasEnrolledInLesson) {
    //TODO use local api to create new userLesson in this user's collection
  }
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

  const { docs: lesson } = lessonData
  const { scenes } = lesson[0]

  return (
    <div>
      <SceneContainer scenes={scenes} />
    </div>
  )
}
