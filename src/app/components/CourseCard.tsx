import Image from 'next/image'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import { areAllCourseLessonsDone } from '@/app/lib/courseAccess'

const CourseCard = async ({ course }: { course: any }) => {
  const isCourseDone = await areAllCourseLessonsDone(course.slug)
  // Check if all prerequisites are completed
  const arePrereqsDone = async () => {
    // If there are no prerequisites, return true
    if (course.prereqs.length === 0) {
      return true
    }

    // Check completion status for each prerequisite course
    const prereqStatuses = await Promise.all(
      course.prereqs.map((prereq: any) => areAllCourseLessonsDone(prereq.slug)),
    )

    // Return true if all prerequisites are completed
    return prereqStatuses.every((status: boolean) => status === true)
  }

  const prereqsCompleted = await arePrereqsDone()
  console.log(prereqsCompleted)

  return (
    <>
      {prereqsCompleted ? (
        <Link href={`/courses/${course.slug}`}>
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm py-4 px-8 w-80 flex flex-col mx-12 transition-all duration-300 hover:shadow-xl relative">
            <ImageSection url={course.cloudinaryUrl} title={course.title} />
            <InfoSection course={course} />
            {isCourseDone && (
              <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </Link>
      ) : (
        <div className="bg-gray-200 rounded-lg border border-gray-300 shadow-sm py-4 px-8 w-80 flex flex-col mx-12 relative opacity-50 cursor-not-allowed">
          <ImageSection url={course.cloudinaryUrl} title={course.title} />
          <InfoSection course={course} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock size={24} className="text-gray-500" />
          </div>
        </div>
      )}
    </>
  )
}

const ImageSection = ({ url, title }: { url: string; title: string }) => (
  <div className="h-40 mb-4">
    <Image
      src={url}
      alt={title}
      width={300}
      height={160}
      className="rounded object-cover w-full h-full"
    />
  </div>
)

const InfoSection = ({ course }: { course: any }) => (
  <div className="flex-grow flex items-between justify-between flex-col mb-2">
    <h2 className="text-lg font-semibold mb-2 line-clamp-2">{course.title}</h2>
    <p className="text-sm text-gray-600 flex-grow ">{course.description}</p>
    {/* <div className="flex items-center gap-2 mt-4">
      <Lock size={16} />
    </div> */}
  </div>
)

export default CourseCard
