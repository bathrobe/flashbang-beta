'use client'
import { useState } from 'react'

interface Answer {
  answerText: string
  answerMessage?: string
  isCorrect: boolean
}

const AnswerChoice = ({
  answer,
  selectedAnswer,
  setSelectedAnswer,
  setCurrentReviewIndex,
  currentReviewIndex,
  disabled,
}: {
  answer: Answer
  selectedAnswer: Answer | null
  setSelectedAnswer: (answer: Answer) => void
  setCurrentReviewIndex: (index: number) => void
  currentReviewIndex: number
  disabled: boolean
}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        setSelectedAnswer(answer)
        if (answer.isCorrect) {
          setCurrentReviewIndex(currentReviewIndex + 1)

          // Scroll to the next review card smoothly
          setTimeout(() => {
            window.scrollTo({
              top: window.scrollY + window.innerHeight,
              behavior: 'smooth',
            })
          }, 100)
        }
      }}
      className="text-lg py-3 px-6 bg-gray-200 text-gray-800 rounded-lg shadow-sm hover:bg-gray-300 transition-colors duration-200 ease-in-out"
    >
      {answer.answerText}
    </button>
  )
}

const ReviewBlock = ({
  review,
  setCurrentReviewIndex,
  currentReviewIndex,
  disabled,
}: {
  review: any
  setCurrentReviewIndex: (index: number) => void
  currentReviewIndex: number
  disabled: boolean
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null)
  return (
    <div className="border border-gray-700 p-4 my-8 rounded-md">
      <div
        className="text-xl mt-4 mb-12 text-center prose max-w-3xl mx-auto"
        dangerouslySetInnerHTML={{ __html: review.reviewQuestion_html }}
      />
      <div className=" max-w-3xl mb-4 mx-auto flex flex-col gap-4">
        {review.answers.map((answer: Answer, index: number) => (
          <AnswerChoice
            key={index}
            answer={answer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            setCurrentReviewIndex={setCurrentReviewIndex}
            currentReviewIndex={currentReviewIndex}
            disabled={disabled}
          />
        ))}
      </div>
      {selectedAnswer && (
        <div className="max-w-[65ch] mx-auto my-8 text-center prose ">
          <p>
            {selectedAnswer.answerMessage
              ? selectedAnswer.answerMessage
              : selectedAnswer.isCorrect
              ? 'Right!'
              : 'Wrong answer, try again.'}
          </p>
        </div>
      )}
    </div>
  )
}

const LessonReview: React.FC<{
  review: any[]
  setLessonPhase: (phase: 'video' | 'review' | 'atom') => void
}> = ({ review, setLessonPhase }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  return (
    <div className="my-12">
      {review.slice(0, currentReviewIndex + 1).map((reviewItem: any, index: number) => (
        <ReviewBlock
          key={index}
          disabled={currentReviewIndex !== index}
          review={reviewItem}
          setCurrentReviewIndex={setCurrentReviewIndex}
          currentReviewIndex={currentReviewIndex}
        />
      ))}
      {currentReviewIndex === review.length && (
        <div className="flex justify-center">
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => setLessonPhase('atom')}
          >
            Advance to Atom Phase
          </button>
        </div>
      )}
    </div>
  )
}

export default LessonReview
