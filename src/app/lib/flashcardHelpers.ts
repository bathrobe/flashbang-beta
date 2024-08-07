export function calculateRetrievability(stability: number, elapsedDays: number): number {
  return Math.exp((elapsedDays * Math.log(0.9)) / stability)
}

export function calculateAverageStability(userFlashcards: any[]): number {
  if (userFlashcards.length === 0) return 0
  const totalStability = userFlashcards.reduce(
    (sum, flashcard) => sum + flashcard.current.stability,
    0,
  )
  return totalStability / userFlashcards.length
}

export function getLatestLogStability(userFlashcard: any): number {
  if (!userFlashcard.log || userFlashcard.log.length === 0) {
    return 0 // Return 0 if there's no log or it's empty
  }

  // Sort the log array by date in descending order and get the first (most recent) item
  const latestLogItem = userFlashcard.log.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0]

  // Return the stability of the most recent log item
  return latestLogItem.stability || 0
}

export function getLastLogAverageStability(lessonCards: any[]): number {
  if (lessonCards.length === 0) return 0

  const totalLastLogStability = lessonCards.reduce((sum, card) => {
    return sum + getLatestLogStability(card)
  }, 0)

  return totalLastLogStability / lessonCards.length
}
