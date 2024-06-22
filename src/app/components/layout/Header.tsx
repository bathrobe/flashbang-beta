import Link from 'next/link'
import authCheck from '@/app/lib/authCheck'
import Logout from 'src/app/components/auth/Logout'

export default async function Header() {
  const user = await authCheck()
  return (
    <header className="flex items-center justify-between p-4">
      <h1>Flashbang</h1>
      <nav>
        {user ? (
          <div className="flex items-center space-x-2">
            <span>{user.email}</span>
            <Logout />
          </div>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </nav>
    </header>
  )
}
