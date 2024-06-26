'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Scene = any // Define your scene type here

type SceneContextProviderProps = {
  children: ReactNode
  scenes: Scene[]
  lessonSlug: string
  courseSlug: string
  userLesson: any
}

const SceneContext = createContext<{
  currentScene: number
  setCurrentScene: React.Dispatch<React.SetStateAction<number>>
  scenes: Scene[]
  courseSlug: string
  lessonSlug: string
  userLesson: any
} | null>(null)

export default function SceneContextProvider({
  children,
  scenes,
  courseSlug,
  lessonSlug,
  userLesson,
}: SceneContextProviderProps) {
  const [currentScene, setCurrentScene] = useState(0)

  return (
    <SceneContext.Provider
      value={{
        currentScene,
        setCurrentScene,
        scenes,
        courseSlug,
        lessonSlug,
        userLesson,
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
