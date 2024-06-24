import Image from 'next/image'
import Link from 'next/link'

const CourseCard = ({ course }: { course: any }) => (
  <Link href={`/courses/${course.slug}`}>
    <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-4 w-80 h-96 flex flex-col transition-all duration-300 hover:shadow-md">
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
  <div className="flex-grow flex flex-col">
    <h2 className="text-lg font-semibold mb-2 line-clamp-2">{course.title}</h2>
    <p className="text-sm text-gray-600 flex-grow overflow-hidden">{course.description}</p>
  </div>
)

export default CourseCard
