import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { authCheck } from '@/app/lib/auth'
import AtomPageCard from '@/app/components/lessons/AtomPageCard'

export const dynamic = 'force-dynamic'

export default async function AtomsPage() {
  const user = await authCheck()
  const payload = await getPayloadHMR({ config: configPromise })

  const userLessons = await payload.find({
    collection: 'userLessons',
    where: {
      user: {
        equals: user.id,
      },
    },
    depth: 1,
  })

  const { docs: lessons } = userLessons

  console.log(lessons)
  return (
    <div>
      {lessons.map((lesson) => (
        <AtomPageCard lesson={lesson} />
      ))}
    </div>
  )
}
