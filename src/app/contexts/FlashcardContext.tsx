'use client'

import { createContext, useContext, useState } from 'react'

type FlashcardContextType = {
  dueCards: any[]
  setDueCards: React.Dispatch<React.SetStateAction<any[]>>
  reviewedCards: any[]
  setReviewedCards: React.Dispatch<React.SetStateAction<any[]>>
  currentCardIndex: number
  setCurrentCardIndex: React.Dispatch<React.SetStateAction<number>>
}

const FlashcardContext = createContext<FlashcardContextType | null>(null)

export default function FlashcardContextProvider({
  children,
  initialDueCards,
}: {
  children: React.ReactNode
  initialDueCards: any[]
}) {
  const [dueCards, setDueCards] = useState<any[]>(initialDueCards)
  const [reviewedCards, setReviewedCards] = useState<any[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)

  return (
    <FlashcardContext.Provider
      value={{
        dueCards,
        setDueCards,
        reviewedCards,
        setReviewedCards,
        currentCardIndex,
        setCurrentCardIndex,
      }}
    >
      {children}
    </FlashcardContext.Provider>
  )
}

export function useFlashcardContext() {
  const context = useContext(FlashcardContext)
  if (!context) {
    throw new Error('useFlashcardContext must be used within a FlashcardContextProvider')
  }
  return context
}
