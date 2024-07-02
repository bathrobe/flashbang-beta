'use client'

import { createContext, useContext, useState } from 'react'

type FlashcardContextProviderProps = {
  children: React.ReactNode
  initialDueCards: any[]
}

const FlashcardContext = createContext<any>(null)

export default function FlashcardContextProvider({
  children,
  initialDueCards,
}: FlashcardContextProviderProps) {
  const [dueCards, setDueCards] = useState<any[]>(initialDueCards)

  return (
    <FlashcardContext.Provider
      value={{
        dueCards,
        setDueCards,
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
