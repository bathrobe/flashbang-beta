'use client'

import { createContext, useContext, useState } from 'react'

type AtomContextProviderProps = {
  children: React.ReactNode
  initialUserAtoms: any[]
}

const AtomContext = createContext<any>(null)

export default function AtomContextProvider({
  children,
  initialUserAtoms,
}: AtomContextProviderProps) {
  const [userAtoms, setUserAtoms] = useState<any[]>(initialUserAtoms)

  return (
    <AtomContext.Provider
      value={{
        userAtoms,
        setUserAtoms,
      }}
    >
      {children}
    </AtomContext.Provider>
  )
}

export function useAtomContext() {
  const context = useContext(AtomContext)
  if (!context) {
    throw new Error('useAtomContext must be used within an AtomContextProvider')
  }
  return context
}
