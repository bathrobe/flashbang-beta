'use client'
import { useState } from 'react'
import { useUserContext } from '@/app/contexts/UserContext'
import CardReview from '@/app/components/flashcards/CardReview'
import { getLastXP, calculateXP, getNewXP } from '@/app/lib/flashcards/flashcardActions'
import { updateLessonXP } from '@/app/lib/lessonActions'

export default function InboxContainer() {
  const { dueCards, setDueCards } = useUserContext()
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [reviewedCards, setReviewedCards] = useState<any[]>([])
  const { userLessons } = useUserContext()

  const handleCardReviewed = (reviewedCard: any) => {
    setReviewedCards([...reviewedCards, reviewedCard])
    setDueCards(dueCards.filter((card) => card.id !== reviewedCard.id))
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % dueCards.length)
  }

  if (dueCards.length === 0 && reviewedCards.length === 0) {
    return <div>No due cards available.</div>
  }

  if (dueCards.length === 0 && reviewedCards.length > 0) {
    const uniqueLessonIds = [
      ...new Set(reviewedCards.map((userFlashcard) => userFlashcard.flashcard.lesson.id)),
    ]
    const lessonXPArray = uniqueLessonIds.map((lessonId) => {
      const lessonCards = reviewedCards.filter((card) => card.flashcard.lesson.id === lessonId)
      const lessonXP = lessonCards.reduce((acc, card) => acc + card.xp, 0)
      const userLesson = userLessons.find((userLesson) => userLesson.lesson.id === lessonId)
      const newXp = userLesson?.xp + lessonXP
      updateLessonXP(lessonId, newXp)
      return {
        id: lessonCards[0].flashcard.lesson.id,
        title: lessonCards[0].flashcard.lesson.title,
        deltaXp: lessonXP,
        oldXp: userLesson?.xp || 0,
        newXp: newXp,
      }
    })
    // send lesson's total xp to the server action to update the userLesson
    // const lessonXPArray = await Promise.all(uniqueLessonIds.map(async (lessonId) => {
    //   const lessonCards = reviewedCards.filter(
    //     (card) => card.flashcard.lesson.id === lessonId
    //   )
    //   const lessonXP = lessonCards.reduce((acc, card) => acc + card.xp, 0)

    //   // Fetch current lesson XP from UserLessons
    //   const userLesson = await getUserLesson(user.id, lessonId)
    //   const oldXP = userLesson?.xp || 0
    //   const newXP = oldXP + lessonXP

    //   // Update lesson XP
    //   await updateLessonXP(lessonId, newXP)

    //   return {
    //     lesson: lessonCards[0].flashcard.lesson.title,
    //     oldXp: oldXP,
    //     xp: lessonXP,
    //     newXP: newXP,
    //   }
    // }))

    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p>You've completed all your due cards for today:</p>
        <ul>
          {lessonXPArray.map((lesson) => (
            <li key={lesson.title}>
              <span>{lesson.title}</span>
              <div>XP Gained: {lesson.deltaXp}</div>
              <div>Old XP: {lesson.oldXp}</div>
              <div>New XP: {lesson.newXp}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="flex my-16 justify-center">
      <CardReview
        card={dueCards[currentCardIndex]}
        reviewedCards={reviewedCards}
        setReviewedCards={setReviewedCards}
        currentCardIndex={currentCardIndex}
        handleCardReviewed={handleCardReviewed}
      />
    </div>
  )
}
