import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Link from 'next/link'
import authCheck from '@/app/lib/authCheck'
import { areAllCourseLessonsDone } from '@/app/lib/courseAccess'
import { redirect } from 'next/navigation'

const checkAuth = async () => {
  const user = await authCheck()
  if (!user) {
    redirect('/auth/login')
  }
}

export const dynamic = 'force-dynamic'
export default async function Page({ params }: { params: any }) {
  const { courseSlug } = params

  await checkAuth()

  const isCourseCompleted = await areAllCourseLessonsDone(courseSlug)
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const courseData = await payload.find({
    collection: 'courses',
    where: {
      slug: {
        equals: courseSlug,
      },
    },
  })

  const { docs: course } = courseData
  const { title, description, lessons } = course[0]

  const user = await authCheck()
  let userLessons: any[] = []
  if (user) {
    const { userData } = user
    userLessons = userData?.userLessons ?? []
  }
  const isLessonCompleted = (lessonId: string) => {
    const userLesson = userLessons.find((ul: any) => ul.lesson.id === lessonId)
    return userLesson?.isCompleted || false
  }
  console.log(lessons)
  return (
    <div>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <div className="flex justify-center mb-8">
          <p className="text-xl text-gray-700">{description}</p>
        </div>
        <section>
          <h2 className="text-2xl font-bold mb-4">Lessons</h2>
          <ul>
            {lessons?.map((lesson: any) => (
              <Link key={lesson?.id} href={`/courses/${courseSlug}/lessons/${lesson?.slug}/scenes`}>
                <li className="flex items-center justify-between mb-4 bg-white rounded-lg shadow-md p-4 relative">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-500 mr-6">{lesson?.number}</span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{lesson?.title}</h3>
                      <p className="text-gray-600">{lesson?.description}</p>
                    </div>
                  </div>
                  {isLessonCompleted(lesson?.id) && (
                    <div className="absolute top-0 right-0 bottom-0 w-16 flex items-center justify-center bg-green-100 rounded-r-lg">
                      <span className="text-green-500 text-3xl">✓</span>
                    </div>
                  )}
                </li>
              </Link>
            ))}
          </ul>
          {isCourseCompleted && (
            <div className="mt-8 bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-green-700 mb-2">Congratulations!</h3>
              <p className="text-lg text-green-600 mb-4">You've completed this course!</p>
              <Link
                href="/"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
              >
                Back to Courses
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
