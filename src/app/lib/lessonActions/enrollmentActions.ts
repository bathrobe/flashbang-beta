'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import authCheck from '@/app/lib/authCheck'

interface UserLesson {
  lesson: {
    id: string | number
    relationTo: 'lessons'
  }
  isCompleted: boolean
  data?: any
}

// Update the UserData type
type UserData = {
  userLessons?: UserLesson[]
  // Add other optional fields if needed
}

async function getLessonBySlug(payload: any, lessonSlug: string) {
  const lessonData = await payload.find({
    collection: 'lessons',
    where: { slug: { equals: lessonSlug } },
  })
  return lessonData.docs[0]
}

export async function enrollInLesson(lessonSlug: string) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const user = await authCheck()

    if (!user?.id) throw new Error('User not authenticated')

    const lesson = await getLessonBySlug(payload, lessonSlug)
    if (!lesson) throw new Error(`Lesson with slug '${lessonSlug}' not found`)

    const newUserLesson: UserLesson = {
      lesson: { id: lesson.id, relationTo: 'lessons' },
      isCompleted: false,
    }

    //@ts-ignore
    const result = await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        userData: {
          userLessons: [...(user.userData?.userLessons || []), newUserLesson],
        },
      },
    })
    console.log('Enrollment result:', result)
    return result
  } catch (error) {
    console.error('Error enrolling in lesson:', error)
    throw error
  }
}

export async function completeLesson(lessonSlug: string) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const user = await authCheck()

    if (!user?.id) throw new Error('User not authenticated')

    const lesson = await getLessonBySlug(payload, lessonSlug)
    if (!lesson) throw new Error(`Lesson with slug '${lessonSlug}' not found`)

    const updatedUserLessons =
      (user?.userData?.userLessons?.map((userLesson: any) =>
        userLesson.lesson.id === lesson.id
          ? {
              lesson: userLesson.lesson.id,
              isCompleted: true,
            }
          : userLesson,
      ) as UserLesson[]) || []

    const result = await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        //@ts-ignore
        userData: {
          userLessons: updatedUserLessons,
        } as UserData, // Type assertion
      },
    })
    console.log('Lesson completion result:', result)
    return result
  } catch (error) {
    console.error('Error completing lesson:', error)
    throw error
  }
}

export async function checkIfCourseIsCompleted(courseSlug: string) {
  const payload = await getPayloadHMR({ config: configPromise })
  const user = await authCheck()
}
