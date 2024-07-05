import '@/globals.css'
import Header from '@/app/components/layout/Header'
import FlashcardContextProvider from '@/app/contexts/FlashcardContext'
import AtomContextProvider from '@/app/contexts/AtomContext'
import { getDueCards } from '@/app/lib/flashcards/flashcardUtils'
import authCheck from '@/app/lib/authCheck'
import { getUserAtoms } from '@/app/lib/atomActions'
import UserContextProvider from '@/app/contexts/UserContext'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await authCheck()
  let dueCards = []
  if (user) {
    dueCards = await getDueCards(user.id)
  }
  let userAtoms: any[] = []
  if (user) {
    userAtoms = await getUserAtoms()
  }
  console.log(user)

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <FlashcardContextProvider initialDueCards={dueCards}>
          <AtomContextProvider initialUserAtoms={userAtoms}>
            <UserContextProvider initialUserClass={user?.userProfile?.orientationClass.name}>
              <Header />
              <main className="flex-grow">{children}</main>
            </UserContextProvider>
          </AtomContextProvider>
        </FlashcardContextProvider>
      </body>
    </html>
  )
}

export default Layout
