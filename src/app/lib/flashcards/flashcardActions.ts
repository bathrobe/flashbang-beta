'use server'
import { getUser } from '../authHelpers'
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

    const xp = await getNewXP(card, rating)

    schedulingResult[rating].log.xp = calculateXP(card, rating)

    const updatedCard = await payload.update({
      collection: 'userFlashcards',
      id: card.id,
      data: {
        current: schedulingResult[rating].card,
        log: [schedulingResult[rating].log, ...(card.log || [])],
        xp: Number(xp),
      },
    })
    return updatedCard
  } catch (error) {
    console.error('Error in answerCard:', error)
    throw error
  }
}

dayjs.extend(isSameOrBefore)

export const calculateXP = (card: Card, rating: number): number => {
  const baseXP = 50
  const difficultyMultiplier = Math.max(1, card.difficulty || 1)
  const ratingBonus = rating * 3 // Higher rating gives more XP

  // Calculate XP based on difficulty and rating
  const xp = baseXP * difficultyMultiplier + ratingBonus

  // Apply a level curve to simulate JRPG-style progression
  const levelCurve = Math.log(xp) * 20

  return Math.round(levelCurve)
}

export const getLastXP = (card: any) => {
  if (!card.log || card.log.length === 0) return 0

  const logDates = card.log.map((logItem: any) => dayjs(logItem.review))
  const lastReviewDate = dayjs.max(logDates)

  const lastLog = card.log.find((logItem: any) => dayjs(logItem.review).isSame(lastReviewDate))

  return lastLog?.xp || 0
}

export const getNewXP = async (card: any, rating: number) => {
  const lastXP = await getLastXP(card)
  console.log('lastXp', lastXP)
  const newXP = await calculateXP(card, rating)
  console.log('newXP', newXP)
  return newXP - (lastXP || 0)
}
