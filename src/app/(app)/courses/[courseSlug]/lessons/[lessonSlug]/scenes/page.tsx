import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import authCheck from '@/app/lib/authCheck'
import SceneWrapper from '@/app/components/scenes/SceneWrapper'
import SceneRouter from '@/app/components/scenes/SceneRouter'
import SceneContextProvider from '@/app/contexts/SceneContext'

export const dynamic = 'force-dynamic'

export default async function ScenesPage({ params }: { params: any }) {
  const user = await authCheck()
  // @ts-ignore
  const { userLessons } = user
  const { courseSlug, lessonSlug } = params
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
      <SceneContextProvider courseSlug={courseSlug} lessonSlug={lessonSlug} scenes={scenes || []}>
        <SceneWrapper>
          <SceneRouter />
        </SceneWrapper>
      </SceneContextProvider>
    </div>
  )
}
