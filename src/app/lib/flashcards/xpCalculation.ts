import { Card } from 'ts-fsrs'

export const calculateXP = (reviewedCards: Card[]): number => {
  return reviewedCards.reduce((totalXP, card) => {
    const baseXP = 100
    const difficultyMultiplier = Math.max(1, (card.stability || 1) * 2)
    return totalXP + Math.round(baseXP * difficultyMultiplier)
  }, 0)
}
