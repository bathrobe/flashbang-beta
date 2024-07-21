import { authCheck } from '@/app/lib/authHelpers'
import InboxContainer from '@/app/components/flashcards/InboxContainer'

export default async function InboxPage() {
  await authCheck()
  return <InboxContainer />
}
