import Link from 'next/link'

const Footer = () => (
  <footer className="mt-24 border-t border-gray-300">
    <div className="flex flex-col items-center py-6">
      <Link
        className="text-sm text-gray-600 hover:text-gray-800 transition-colors mb-2"
        href="https://flashbangapp.substack.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Subscribe
      </Link>
    </div>
  </footer>
)

export default Footer
