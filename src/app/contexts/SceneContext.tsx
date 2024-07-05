'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Scene = any // Define your scene type here
type UserAtom = any // Define your user atom type here

type SceneContextProviderProps = {
  children: ReactNode
  scenes: Scene[]
  lessonSlug: string
  courseSlug: string
  userLesson: any
  userAtomsData: UserAtom[]
}

const SceneContext = createContext<{
  currentScene: number
  setCurrentScene: React.Dispatch<React.SetStateAction<number>>
  scenes: Scene[]
  courseSlug: string
  lessonSlug: string
  userLesson: any
  userAtomsData: UserAtom[]
  isCurrentQuestionAnswered: boolean
  setIsCurrentQuestionAnswered: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export default function SceneContextProvider({
  children,
  scenes,
  courseSlug,
  lessonSlug,
  userLesson,
  userAtomsData,
}: SceneContextProviderProps) {
  const [currentScene, setCurrentScene] = useState(0)
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false)

  return (
    <SceneContext.Provider
      value={{
        currentScene,
        setCurrentScene,
        scenes,
        courseSlug,
        lessonSlug,
        userLesson,
        userAtomsData,
        isCurrentQuestionAnswered,
        setIsCurrentQuestionAnswered,
      }}
    >
      {children}
    </SceneContext.Provider>
  )
}

export function useSceneContext() {
  const context = useContext(SceneContext)
  if (!context) {
    throw new Error('useSceneContext must be used within a SceneContextProvider')
  }
  return context
}
