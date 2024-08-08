'use server'
import { getUser } from '@/app/lib/auth'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { createEmptyCard } from 'ts-fsrs'

export async function updateLearningPhase(userLesson: any) {
  const payload = await getPayloadHMR({ config: configPromise })
  const user = await getUser()
  if (!user) throw new Error('User not authenticated')
  if (!userLesson) throw new Error('User Lesson not found')
  console.log('updating learning phase')

  try {
    // Fetch the current learning phase
    const currentPhase = await payload.findByID({
      collection: 'learningPhases',
      id: userLesson.currentPhase.id,
    })

    if (!currentPhase) throw new Error('Current learning phase not found')

    // Find the next learning phase
    const nextPhase = await payload.find({
      collection: 'learningPhases',
      where: {
        stage: {
          equals: Number(currentPhase?.stage) + 1,
        },
      },
    })

    if (!nextPhase.docs.length) throw new Error('Next learning phase not found')

    // Update the user lesson with the new learning phase
    const updatedUserLesson = await payload.update({
      collection: 'userLessons',
      id: userLesson.id,
      data: {
        currentPhase: Number(nextPhase.docs[0].id),
      },
    })

    // Fetch the lesson to get the flashcards
    const lesson = await payload.findByID({
      collection: 'lessons',
      id: userLesson.lesson.id,
    })

    if (!lesson) throw new Error('Lesson not found')

    // Filter flashcards for the new learning phase
    // @ts-ignore
    const newPhaseFlashcards = lesson.flashcards.filter(
      (flashcard: any) =>
        flashcard.learningPhase && flashcard.learningPhase.id === nextPhase.docs[0].id,
    )

    // Create UserFlashcards for the new phase flashcards
    const userFlashcardPromises = newPhaseFlashcards.map((flashcard: any) =>
      payload.create({
        collection: 'userFlashcards',
        data: {
          user: user.id,
          flashcard: flashcard.id,
          userLesson: userLesson.id,
          current: JSON.stringify(createEmptyCard()),
          log: [],
        },
      }),
    )

    await Promise.all(userFlashcardPromises)

    console.log('updated learning phase and created new UserFlashcards')
    return updatedUserLesson
  } catch (error) {
    console.error('Error updating learning phase:', error)
    throw error
  }
}

export async function completeLesson(lesson: any) {
  'use server'
  const payload = await getPayloadHMR({ config: configPromise })
  const user = await getUser()
  if (!user) throw new Error('User not authenticated')
  if (!lesson) throw new Error('Lesson not found')
  try {
    const learningPhase = await payload.find({
      collection: 'learningPhases',
      where: {
        stage: {
          equals: 1,
        },
      },
    })
    const newUserLesson = await payload.create({
      collection: 'userLessons',
      data: {
        user: user.id,
        lesson: lesson.id,
        isCompleted: true,
        // @ts-ignore
        currentPhase: learningPhase.docs[0].id,
      },
    })

    const userFlashcardPromises = lesson.flashcards
      .filter((flashcard: any) => flashcard.learningPhase.stage === 1)
      .map((flashcard: any) =>
        payload.create({
          collection: 'userFlashcards',
          data: {
            user: user.id,
            flashcard: flashcard.id,
            userLesson: Number(newUserLesson.id),
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
