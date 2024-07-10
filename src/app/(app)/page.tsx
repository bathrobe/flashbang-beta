import authCheck from '../lib/authCheck'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import CourseCard from '../components/CourseCard'
import Link from 'next/link'

export default async function Home() {
  const user = await authCheck()
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const coursesData = await payload.find({
    collection: 'courses',
    depth: 1,
  })
  let { docs: courses } = coursesData

  const sortedCourses = courses.sort((a, b) => {
    const aHasPrereqs = a.prereqs && a.prereqs.length > 0
    const bHasPrereqs = b.prereqs && b.prereqs.length > 0
    return aHasPrereqs === bHasPrereqs ? 0 : aHasPrereqs ? 1 : -1
  })

  return user ? (
    <div className="flex mt-16 items-center px-8 justify-center gap-4">
      {sortedCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  ) : (
    <Link href="/auth/login">Please login</Link>
  )
}
