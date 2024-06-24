'use client'

import React, { useEffect, useRef } from 'react'

export default function Scene({
  scene,
  setCurrentScene,
  currentScene,
}: {
  scene: any
  setCurrentScene: any
  currentScene: any
}) {
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const header = document.querySelector('header')
    if (header) {
      headerRef.current = header
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`)
    }
  }, [])

  return (
    <div
      className="flex flex-col bg-white text-black"
      style={{ height: 'calc(100vh - var(--header-height, 0px))' }}
    >
      <div className="flex-grow flex flex-col p-4">
        <div className="flex-grow rounded-lg border-2 border-gray-300 mb-4 overflow-hidden">
          <img src={scene.cloudinaryUrl} alt="Scene" className="w-full h-full object-cover" />
        </div>
        <div className="rounded-lg border-2 border-gray-300 mb-4 p-2 h-1/5 overflow-y-auto">
          <p>{scene.dialogue}</p>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded"
            onClick={() => setCurrentScene(currentScene - 1)}
          >
            go back
          </button>
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded"
            onClick={() => setCurrentScene(currentScene + 1)}
          >
            next
          </button>
        </div>
      </div>
    </div>
  )
}
