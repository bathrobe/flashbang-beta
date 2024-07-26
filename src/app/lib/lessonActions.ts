'use server'
import { getUser } from '@/app/lib/authHelpers'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { createEmptyCard } from 'ts-fsrs'
import { use } from 'react'

export async function completeLesson(lesson: any) {
  'use server'
  const payload = await getPayloadHMR({ config: configPromise })
  const user = await getUser()
  if (!user) throw new Error('User not authenticated')
  if (!lesson) throw new Error('Lesson not found')
  console.log(user.lessons)
  try {
    // @ts-ignore
    const existingLessons =
      user.lessons?.map((l: any) => ({ lesson: l.lesson?.id, isCompleted: true })) || []
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        lessons: [...existingLessons, { lesson: lesson.id, isCompleted: true }],
      },
    })

    const userFlashcardPromises = lesson.flashcards.map((flashcard: any) =>
      payload.create({
        collection: 'userFlashcards',
        data: {
          user: user.id,
          flashcard: flashcard.id,
          lesson: lesson.id,
          current: JSON.stringify(createEmptyCard()),
          log: [],
        },
      }),
    )

    await Promise.all(userFlashcardPromises)
  } catch (error) {
    console.error('Error assigning lesson:', error)
    throw error
  }
}
