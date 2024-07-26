import { getUser } from '../lib/authHelpers'
import LessonCard from '../components/lessons/LessonCard'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Link from 'next/link'

export default async function Home() {
  const user = await getUser()

  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const coursesData = await payload.find({
    collection: 'courses',
    depth: 1,
  })
  let { docs: courses } = coursesData

  return user ? (
    <div className="flex flex-col w-full max-w-3xl mx-auto mt-16 items-stretch px-8 justify-center gap-4">
      {courses.flatMap((course, courseIdx) =>
        course?.lessons?.map((lesson, lessonIdx) => (
          <LessonCard
            key={`${courseIdx}-${lessonIdx}`}
            course={course}
            user={user}
            lesson={lesson}
          />
        )),
      )}
    </div>
  ) : (
    <Link href="/auth/login">Please login</Link>
  )
}
