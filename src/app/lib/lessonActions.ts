'use server'
import { getUser } from '@/app/lib/authHelpers'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { createEmptyCard } from 'ts-fsrs'

export async function completeLesson(lesson: any) {
  'use server'
  const payload = await getPayloadHMR({ config: configPromise })
  const user = await getUser()
  if (!user) throw new Error('User not authenticated')
  if (!lesson) throw new Error('Lesson not found')
  try {
    await payload.create({
      collection: 'userLessons',
      data: {
        user: user.id,
        lesson: lesson.id,
        isCompleted: true,
        xp: 0,
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
          xp: 0,
        },
      }),
    )

    await Promise.all(userFlashcardPromises)
  } catch (error) {
    console.error('Error assigning lesson:', error)
    throw error
  }
}
export async function updateLessonXP(lessonId: string, newXP: number) {
  const payload = await getPayloadHMR({ config: configPromise })
  const user = await getUser()
  if (!user) throw new Error('User not authenticated')
  if (!lessonId) throw new Error('Lesson not found')
  try {
    const updatedUserLesson = await payload.update({
      collection: 'userLessons',
      where: {
        user: {
          equals: user.id,
        },
        lesson: {
          equals: lessonId,
        },
      },
      data: {
        xp: newXP,
      },
    })

    if (!updatedUserLesson) {
      throw new Error('Failed to update user lesson XP')
    }

    return updatedUserLesson
  } catch (error) {
    console.error('Error updating lesson XP:', error)
    throw error
  }
}
