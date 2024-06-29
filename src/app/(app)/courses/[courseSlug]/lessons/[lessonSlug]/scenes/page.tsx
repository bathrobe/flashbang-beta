import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import authCheck from '@/app/lib/authCheck'
import SceneWrapper from '@/app/components/scenes/SceneWrapper'
import SceneRouter from '@/app/components/scenes/SceneRouter'
import SceneContextProvider from '@/app/contexts/SceneContext'
import { enrollInLesson } from '@/app/lib/lessonActions/enrollmentActions'

export const dynamic = 'force-dynamic'

export default async function ScenesPage({ params }: { params: any }) {
  const user = await authCheck()
  // @ts-ignore
  const { courseSlug, lessonSlug } = params
  const hasEnrolledInLesson = user?.userData?.userLessons?.some(
    (lesson: any) => lesson.lesson.slug === lessonSlug,
  )
  console.log(hasEnrolledInLesson)
  if (!hasEnrolledInLesson) {
    //TODO use local api to create new userLesson in this user's collection
    await enrollInLesson(lessonSlug)
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
