'use client'

import { createContext, useContext, useState, useMemo } from 'react'

type UserContextProviderProps = {
  children: React.ReactNode
  initialUserClass: any
  initialLevel: any
  initialXP: any
  initialDueCards: any[]
}

type UserContextType = {
  userClass: any
  setUserClass: React.Dispatch<React.SetStateAction<any>>
  currentLevel: number
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>
  currentXP: number
  setCurrentXP: React.Dispatch<React.SetStateAction<number>>
  dueCards: any[]
  setDueCards: React.Dispatch<React.SetStateAction<any[]>>
  reviewedCards: any[]
  setReviewedCards: React.Dispatch<React.SetStateAction<any[]>>
  currentCardIndex: number
  setCurrentCardIndex: React.Dispatch<React.SetStateAction<number>>
}

const UserContext = createContext<UserContextType | null>(null)

export default function UserContextProvider({
  children,
  initialUserClass,
  initialLevel,
  initialXP,
  initialDueCards,
}: UserContextProviderProps) {
  const [userClass, setUserClass] = useState<any>(initialUserClass)
  const [currentLevel, setCurrentLevel] = useState(initialLevel)
  const [currentXP, setCurrentXP] = useState(initialXP)
  const [dueCards, setDueCards] = useState<any[]>(initialDueCards)
  const [reviewedCards, setReviewedCards] = useState<any[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)

  const value = useMemo(
    () => ({
      userClass,
      setUserClass,
      currentLevel,
      setCurrentLevel,
      currentXP,
      setCurrentXP,
      dueCards,
      setDueCards,
      reviewedCards,
      setReviewedCards,
      currentCardIndex,
      setCurrentCardIndex,
    }),
    [userClass, currentLevel, currentXP, dueCards, reviewedCards, currentCardIndex],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider')
  }
  return context
}
