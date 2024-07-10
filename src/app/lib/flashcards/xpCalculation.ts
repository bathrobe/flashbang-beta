import { Card } from 'ts-fsrs'

export const calculateXP = (reviewedCards: Card[]): number => {
  return reviewedCards.reduce((totalXP, card) => {
    const baseXP = 10
    const difficultyMultiplier = Math.max(1, (card.difficulty || 1) * 2)
    return totalXP + Math.round(baseXP * difficultyMultiplier)
  }, 0)
}
