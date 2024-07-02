import '@/globals.css'
import Header from '@/app/components/layout/Header'
import FlashcardContextProvider from '@/app/contexts/FlashcardContext'
import { getDueCards } from '@/app/lib/flashcards/flashcardUtils'
import authCheck from '@/app/lib/authCheck'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await authCheck()
  let dueCards = []
  if (user) {
    dueCards = await getDueCards(user.id)
  }
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <FlashcardContextProvider initialDueCards={dueCards}>
          <Header />
          <main className="flex-grow">{children}</main>
        </FlashcardContextProvider>
      </body>
    </html>
  )
}

export default Layout
