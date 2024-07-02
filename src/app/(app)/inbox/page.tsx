import authCheck from '@/app/lib/authCheck'
import { redirect } from 'next/navigation'
import InboxContainer from '@/app/components/flashcards/InboxContainer'

const checkAuth = async () => {
  const user = await authCheck()
  if (!user) {
    redirect('/auth/login')
  }
}
export default async function InboxPage() {
  await checkAuth()
  return <InboxContainer />
}
