import Image from 'next/image'
import Link from 'next/link'

const CourseCard = ({ course }: { course: any }) => (
  <Link href={`/courses/${course.slug}`}>
    <div className="bg-white rounded-lg border-2 border-gray-600 shadow-md p-6 flex max-w-5xl h-full transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/50 hover:border-gray-800 hover:scale-105 hover:translate-y-[-2px]">
      <ImageSection url={course.cloudinaryUrl} title={course.title} />
      <InfoSection course={course} />
    </div>
  </Link>
)

const ImageSection = ({ url, title }: { url: string; title: string }) => (
  <div className="w-1/4 pr-4 flex items-center">
    <Image
      src={url}
      alt={title}
      width={100}
      height={100}
      className="rounded object-cover w-full h-full"
    />
  </div>
)

const InfoSection = ({ course }: { course: any }) => (
  <div className="w-1/2 flex flex-col justify-between">
    <div>
      <h2 className="text-xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-600 mb-4">{course.description}</p>
    </div>
    <div>
      <h3 className="font-semibold mb-2">Sources:</h3>
      <SourceList sources={course.sources} />
    </div>
  </div>
)

const SourceList = ({ sources }: { sources: Array<{ id: string; title: string }> }) => (
  <ul className="list-disc pl-5">
    {sources.map((source) => (
      <li key={source.id}>{source.title}</li>
    ))}
  </ul>
)

export default CourseCard
