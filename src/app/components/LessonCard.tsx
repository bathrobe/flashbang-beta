import Image from 'next/image'
import Link from 'next/link'

const LessonCard = ({ lesson }: { lesson: any }) => (
  <Link href={`/lessons/${lesson.slug}`}>
    <div className="bg-white rounded-lg border-2 border-gray-600 shadow-md p-4 flex max-w-5xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/50 hover:border-gray-800 hover:scale-105 hover:translate-y-[-2px]">
      <div className="w-1/6 flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-700">{lesson.number}</span>
      </div>
      <div className="w-5/6 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-2">{lesson.title}</h2>
        <p className="text-gray-600">{lesson.description}</p>
      </div>
    </div>
  </Link>
)

export default LessonCard
