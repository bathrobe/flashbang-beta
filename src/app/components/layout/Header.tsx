import Link from 'next/link'
import authCheck from '@/app/lib/authCheck'
import Logout from 'src/app/components/auth/Logout'

export default async function Header() {
  const user = await authCheck()
  return (
    <header
      className="flex items-center justify-between p-2"
      style={{ height: 'var(--header-height, auto)' }}
    >
      <Link href="/" className="text-lg font-bold">
        Flashbang
      </Link>
      <nav>
        {user ? (
          <div className="flex items-center space-x-2 text-sm">
            <span>{user.email}</span>
            <Logout />
          </div>
        ) : (
          <Link href="/auth/login" className="text-sm">
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}
