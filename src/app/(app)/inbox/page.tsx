import { authCheck } from '@/app/lib/auth'
import InboxContainer from '@/app/components/flashcards/InboxContainer'

export default async function InboxPage() {
  await authCheck()
  return <InboxContainer />
}
