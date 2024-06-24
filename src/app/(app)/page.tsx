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
  const { docs: courses } = coursesData

  console.log(user)
  return user ? (
    <div className="flex mt-16 items-center justify-center flex-col gap-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  ) : (
    <div>Please login</div>
  )
}
