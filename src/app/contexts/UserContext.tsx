'use client'

import { createContext, useContext, useState, useMemo } from 'react'

type UserContextProviderProps = {
  children: React.ReactNode
  initialDueCards: any[]
  initialUser: any[] | null
  initialUserLessons: any[]
}

type UserContextType = {
  dueCards: any[]
  setDueCards: React.Dispatch<React.SetStateAction<any[]>>
  user: any
  setUser: React.Dispatch<React.SetStateAction<any>>
  userLessons: any[]
  setUserLessons: React.Dispatch<React.SetStateAction<any[]>>
}

const UserContext = createContext<UserContextType | null>(null)

export default function UserContextProvider({
  children,
  initialDueCards,
  initialUser,
  initialUserLessons,
}: UserContextProviderProps) {
  const [dueCards, setDueCards] = useState<any[]>(initialDueCards)
  const [user, setUser] = useState<any>(initialUser)
  const [userLessons, setUserLessons] = useState<any[]>(initialUserLessons)

  const value = useMemo(
    () => ({
      dueCards,
      setDueCards,
      user,
      setUser,
      userLessons,
      setUserLessons,
    }),
    [dueCards, user, userLessons],
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
