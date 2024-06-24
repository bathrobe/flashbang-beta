import authCheck from '../lib/authCheck'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import CourseCard from '../components/CourseCard'

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
  // @ts-ignore

  return user ? (
    <div className="flex mt-16 items-center px-8 justify-center gap-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  ) : (
    <div>Please login</div>
  )
}
