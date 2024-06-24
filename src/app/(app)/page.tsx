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
  const { userCourses } = user
  // .some checks if at least one element in the array satisfies the given condition
  const hasCompletedCourses = userCourses?.some((course: any) => course.completed === true)

  if (!hasCompletedCourses) {
    courses = courses.filter((course: any) => course.slug === 'orientation')
  } else {
    courses = courses.filter((course: any) => course.slug !== 'orientation')
  }

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
