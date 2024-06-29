'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import authCheck from '@/app/lib/authCheck'

export async function enrollInLesson(lessonSlug: string) {
  const payload = await getPayloadHMR({ config: configPromise })
  const user = await authCheck()

  if (!user?.id) {
    throw new Error('User not found')
  }

  const lessonData = await payload.find({
    collection: 'lessons',
    where: {
      slug: {
        equals: lessonSlug,
      },
    },
  })
  const lesson = lessonData.docs[0]

  if (!lesson) {
    throw new Error('Lesson not found')
  }

  const result = await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      userData: {
        userLessons: [
          ...(user.userData?.userLessons || []),
          {
            lesson: {
              id: lesson.id,
              relationTo: 'lessons',
            },
            isCompleted: false,
          },
        ],
      },
    },
  })
  console.log('Enrollment result:', result)
}
export async function completeLesson(lessonSlug: string) {
  const payload = await getPayloadHMR({ config: configPromise })
  const user = await authCheck()

  if (!user?.id) {
    throw new Error('User not found')
  }

  const lessonData = await payload.find({
    collection: 'lessons',
    where: {
      slug: {
        equals: lessonSlug,
      },
    },
  })

  const lesson = lessonData.docs[0]

  if (!lesson) {
    throw new Error('Lesson not found')
  }

  const updatedUserLessons =
    user.userData?.userLessons?.map((userLesson: any) =>
      userLesson.lesson.id === lesson.id
        ? {
            ...userLesson,
            isCompleted: true,
            lesson: {
              id: lesson.id,
              relationTo: 'lessons',
            },
          }
        : userLesson,
    ) || []

  console.log('WE ARE FINISHING COMPLETELESSON')
  const result = await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      userData: {
        ...user.userData,
        userLessons: updatedUserLessons,
      },
    },
  })
  console.log('Lesson completion result:', result)
}
