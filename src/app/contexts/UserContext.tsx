'use client'

import { createContext, useContext, useState } from 'react'

type UserContextProviderProps = {
  children: React.ReactNode
  initialUserClass: any
}

const UserContext = createContext<any>(null)

export default function UserContextProvider({
  children,
  initialUserClass,
}: UserContextProviderProps) {
  const [userClass, setUserClass] = useState<any>(initialUserClass)

  return (
    <UserContext.Provider
      value={{
        userClass,
        setUserClass,
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
