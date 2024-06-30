import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import SceneWrapper from '@/app/components/scenes/SceneWrapper'
import SceneRouter from '@/app/components/scenes/SceneRouter'
import SceneContextProvider from '@/app/contexts/SceneContext'
import authCheck from '@/app/lib/authCheck'
import { enrollInLesson } from '@/app/lib/lessonActions/enrollmentActions'
import { redirect } from 'next/navigation'

const checkAuth = async () => {
  const user = await authCheck()
  if (!user) {
    redirect('/auth/login')
  }
}

export const dynamic = 'force-dynamic'

export default async function ScenesPage({ params }: { params: any }) {
  await checkAuth()
  // @ts-ignore
  const { courseSlug, lessonSlug } = params
  const user = await authCheck()

  let userLessons: any[] = []
  if (user && user.userData?.userLessons) {
    userLessons = user.userData.userLessons
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

  const userLesson = userLessons.find((lesson: any) => lesson.lesson.slug === lessonSlug)
  if (!userLesson) {
    await enrollInLesson(lessonSlug)
  }

  const { docs: lesson } = lessonData
  const { scenes } = lesson[0]

  return (
    <div>
      <SceneContextProvider
        userLesson={userLesson}
        courseSlug={courseSlug}
        lessonSlug={lessonSlug}
        scenes={scenes || []}
      >
        <SceneWrapper>
          <SceneRouter />
        </SceneWrapper>
      </SceneContextProvider>
    </div>
  )
}
