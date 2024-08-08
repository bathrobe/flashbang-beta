import { getUser } from '../lib/auth'
import TodayLearning from '../components/TodayLearning'
import LessonCard from '../components/lessons/LessonCard'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Link from 'next/link'

export default async function Home() {
  const user = await getUser()
  if (!user) return <Link href="/auth/login">Please login</Link>

  const payload = await getPayloadHMR({ config: configPromise })
  const { docs: courses } = await payload.find({ collection: 'courses', depth: 1 })
  const { docs: userLessons } = await payload.find({
    collection: 'userLessons',
    where: { user: { equals: user.id } },
  })

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto mt-16 items-stretch px-8 justify-center gap-4">
      <TodayLearning courses={courses} userLessons={userLessons} />
    </div>
  )
}
