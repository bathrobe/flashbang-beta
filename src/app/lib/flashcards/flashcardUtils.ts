import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

// Extend dayjs with the isSameOrBefore plugin
dayjs.extend(isSameOrBefore)

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
