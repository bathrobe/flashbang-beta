import { getUser } from '../lib/authHelpers'
import LessonCard from '../components/lessons/LessonCard'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import CourseCard from '../components/CourseCard'
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
    <div className="flex mt-16 items-center px-8 justify-center gap-4">
      {courses.map((course, idx) =>
        course.lessons?.map((lesson) => <LessonCard key={idx} course={course} lesson={lesson} />),
      )}
    </div>
  ) : (
    <Link href="/auth/login">Please login</Link>
  )
}
