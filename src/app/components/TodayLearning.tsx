'use client'
import { useUserContext } from '../contexts/UserContext'
import LessonCard from './lessons/LessonCard'

interface Course {
  isHidden: boolean
  lessons: Lesson[]
}

interface Lesson {
  id: string
}

interface UserLesson {
  lesson: {
    id: string
  }
}

const TodayLearning: React.FC<{ courses: Course[]; userLessons: UserLesson[] }> = ({
  courses,
  userLessons,
}) => {
  const { dueCards } = useUserContext()

  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-2xl font-bold">Today's Learning</h2>
      {dueCards.length > 0 && (
        <div className="bg-yellow-100 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-yellow-700">Disabled until cards are reviewed</h3>
        </div>
      )}
      <div className="p-4 rounded-lg">
        {courses
          .filter((course) => !course.isHidden)
          .flatMap((course, courseIdx) =>
            course.lessons.map((lesson, lessonIdx) => {
              const userLesson = userLessons.find((ul) => ul.lesson.id === lesson.id)
              return (
                <LessonCard
                  key={`${courseIdx}-${lessonIdx}`}
                  lesson={lesson}
                  course={course}
                  userLesson={userLesson}
                  dueCards={dueCards.length > 0}
                />
              )
            }),
          )}
      </div>
    </div>
  )
}

export default TodayLearning
