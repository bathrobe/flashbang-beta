'use server'
import { getUser } from './auth'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { redirect } from 'next/navigation'
import { fsrs, generatorParameters } from 'ts-fsrs'
import { Card } from 'ts-fsrs'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import minMax from 'dayjs/plugin/minMax'

const srs = fsrs(generatorParameters({ enable_fuzz: true, maximum_interval: 365 }))

dayjs.extend(isSameOrBefore)
dayjs.extend(minMax)

export const getDueCards = async (user: any) => {
  try {
    if (!user) return []

    const payload = await getPayloadHMR({ config: configPromise })

    const currentDate = dayjs()

    const userCards = await payload.find({
      collection: 'userFlashcards',
      where: {
        user: {
          equals: user.id,
        },
      },
      depth: 1, // To populate the flashcard and lesson relationships
    })

    const { docs } = userCards
    const dueCards = docs.filter((card: any) => {
      const dueDate = dayjs(card.current.due)
      return dueDate.isSameOrBefore(currentDate, 'day')
    })
    return dueCards.map((card: any) => ({
      ...card,
      flashcard: card.flashcard,
      lessonId: card.lesson,
    }))
  } catch (error) {
    console.error('Error fetching due cards:', error)
    return []
  }
}
export async function answerCard(card: any, input: string, rating: number) {
  try {
    const user = await getUser()
    if (!user) {
      redirect('/auth/login')
    }

    const payload = await getPayloadHMR({ config: configPromise })

    const schedulingResult = srs.repeat(card.current, new Date()) as any

    const today = dayjs()
    const dueDate = dayjs(schedulingResult[rating].card.due)

    if (dueDate.isSame(today, 'day')) {
      schedulingResult[rating].card.due = today.add(1, 'day').toDate()
    }
    const updatedCard = await payload.update({
      collection: 'userFlashcards',
      id: card.id,
      data: {
        current: schedulingResult[rating].card,
        log: [schedulingResult[rating].log, ...(card.log || [])],
      },
    })
    return updatedCard
  } catch (error) {
    console.error('Error in answerCard:', error)
    throw error
  }
}
