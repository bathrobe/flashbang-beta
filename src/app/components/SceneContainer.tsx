'use client'
import { useState } from 'react'
import Scene from './Scene'

export default function SceneContainer({ scenes }: { scenes: any }) {
  const [currentScene, setCurrentScene] = useState(0)

  return (
    <Scene
      setCurrentScene={setCurrentScene}
      currentScene={currentScene}
      scene={scenes[currentScene]}
    />
  )
}
