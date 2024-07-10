'use client'

import { createContext, useContext, useState } from 'react'

type UserContextProviderProps = {
  children: React.ReactNode
  initialUserClass: any
  initialLevel: any
  initialXP: any
}

type UserContextType = {
  userClass: any
  setUserClass: React.Dispatch<React.SetStateAction<any>>
  currentLevel: number
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>
  currentXP: number
  setCurrentXP: React.Dispatch<React.SetStateAction<number>>
}

const UserContext = createContext<UserContextType | null>(null)

export default function UserContextProvider({
  children,
  initialUserClass,
  initialLevel,
  initialXP,
}: UserContextProviderProps) {
  const [userClass, setUserClass] = useState<any>(initialUserClass)
  const [currentLevel, setCurrentLevel] = useState(initialLevel)
  const [currentXP, setCurrentXP] = useState(initialXP)

  return (
    <UserContext.Provider
      value={{
        userClass,
        setUserClass,
        currentLevel,
        setCurrentLevel,
        currentXP,
        setCurrentXP,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider')
  }
  return context
}
