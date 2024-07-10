import Link from 'next/link'
import authCheck from '@/app/lib/authCheck'
import Logout from 'src/app/components/auth/Logout'
import InboxNoties from './InboxNoties'
import HUD from './HUD'

export default async function Header() {
  const user = await authCheck()
  return (
    <header
      className="flex justify-between items-center p-2"
      style={{ height: 'var(--header-height, auto)' }}
    >
      <div className="flex items-center">
        <Link href="/" className="text-lg mr-4 font-bold border-r border-gray-900 pr-4">
          Flashbang
        </Link>
        <div>{user ? <HUD /> : ''}</div>
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
              <Link className="ml-4" href="/">
                Courses
              </Link>
              <Link className="ml-4" href="/sources">
                Sources
              </Link>
              <Link
                className="ml-4"
                href="https://flashbangapp.substack.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe
              </Link>
            </span>
            <span>{user.email}</span>
            <Logout />
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/auth/login">Login</Link>
            <Link
              href="https://flashbangapp.substack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
