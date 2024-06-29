import Image from 'next/image'
import Link from 'next/link'
import { Lock } from 'lucide-react'

const CourseCard = ({ course }: { course: any }) => (
  <Link href={`/courses/${course.slug}`}>
    <div className="bg-white rounded-lg border border-gray-300 shadow-sm py-4 px-8 w-80 flex flex-col mx-12 transition-all duration-300 hover:shadow-xl">
      <ImageSection url={course.cloudinaryUrl} title={course.title} />
      <InfoSection course={course} />
    </div>
  </Link>
)

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
