import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import authCheck from '@/app/lib/authCheck'

export async function areAllCourseLessonsDone(courseSlug: string): Promise<boolean> {
  const payload = await getPayloadHMR({ config: configPromise })
  const user = await authCheck()

  if (!user?.id) throw new Error('User not authenticated')

  // Get course and its lessons
  const courseData = await payload.find({
    collection: 'courses',
    where: { slug: { equals: courseSlug } },
    depth: 1,
  })

  if (!courseData.docs.length) throw new Error(`Course with slug '${courseSlug}' not found`)

  const course = courseData.docs[0]
  const courseLessons = course.lessons || []

  if (!courseLessons.length) return false

  // Get user's completed lessons
  const userLessons = user.userData?.userLessons || []
  const completedLessonIds = new Set(
    userLessons.filter((ul: any) => ul.isCompleted).map((ul: any) => ul.lesson.id),
  )

  // Check if all course lessons are completed
  const allLessonsCompleted = courseLessons.every((lesson: any) =>
    completedLessonIds.has(lesson.id),
  )

  return allLessonsCompleted
}
