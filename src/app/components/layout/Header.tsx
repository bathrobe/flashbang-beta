import Link from 'next/link'
import { getUser } from '@/app/lib/auth'
import Logout from 'src/app/components/auth/Logout'
import InboxNoties from './InboxNoties'

export default async function Header() {
  const user = await getUser()
  return (
    <header
      className="flex justify-between items-center p-2"
      style={{ height: 'var(--header-height, auto)' }}
    >
      <div className="flex items-center">
        <Link href="/" className="text-lg font-bold ">
          Flashbang
        </Link>
      </div>
      <nav className="">
        {user ? (
          <div className="flex items-center space-x-2 text-sm">
            <span className="border-r border-gray-900 pr-4 mr-2">
              <Link href="/inbox">
                <span className="mr-2">Inbox</span>
                <InboxNoties />
              </Link>
              <Link className="ml-4" href="/atoms">
                Atoms
              </Link>
            </span>
            <span>{user.email}</span>
            <Logout />
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/auth/login">Login</Link>
          </div>
        )}
      </nav>
    </header>
  )
}
