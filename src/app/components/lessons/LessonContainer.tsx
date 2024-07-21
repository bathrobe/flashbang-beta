'use client'
import { useState } from 'react'
import AtomCard from '@/app/components/AtomCard'
import ReviewPhase from './ReviewPhase'

const LessonContainer = ({
  lesson,
  atom,
  flashcards,
}: {
  lesson: any
  atom: any
  flashcards: any[] | null | undefined
}) => {
  return (
    <div>
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>
    </div>
  )
}

export default LessonContainer
