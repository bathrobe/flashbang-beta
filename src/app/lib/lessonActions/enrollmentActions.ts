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

  let lessonData = await payload.find({
    collection: 'lessons',
    where: {
      slug: {
        equals: lessonSlug,
      },
    },
  })
  const { docs } = lessonData
  const lesson = docs[0]

  console.log('this is the lesson', lesson)

  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      userData: { userLessons: [...user.userData.userLessons, { lesson: lesson.id }] },
    },
  })
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

  // const lessonId = lessonData?.docs[0].id

  // const { docs: lessons } = lessonData
  // const lesson = lessons[0]
  // console.log('this is the lesson', lesson)

  // //   console.log(user)
  // await payload.update({
  //   collection: 'users',
  //   id: user.id,
  //   data: {
  //     //@ts-ignore
  //     userLessons:
  //       user?.userLessons?.map((userLesson) =>
  //         //@ts-ignore
  //         userLesson.lesson.id === lessonId ? { ...userLesson, completed: true } : userLesson,
  //       ) ?? [],
  //   },
  // })
}
