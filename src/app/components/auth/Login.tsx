'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { loginUser } from '@/app/lib/auth'
import Link from 'next/link'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await loginUser(new FormData(event.currentTarget))
    } catch (error: any) {
      setErrorMessage(error.message)
    }
    setIsSubmitting(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md mx-auto space-y-4 p-8 bg-white shadow-md rounded-lg mt-8"
    >
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        value={formData.email}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        onChange={handleChange}
        value={formData.password}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <button
        aria-disabled={isSubmitting}
        type="submit"
        disabled={isSubmitting}
        className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
      <div className="flex justify-between mt-6 text-sm">
        <p>
          No account?{' '}
          <Link href="/auth/create" className="text-blue-500 hover:text-blue-600 transition-colors">
            Sign up
          </Link>
        </p>
        <Link href="/auth/forgot" className="text-blue-500 hover:text-blue-600 transition-colors">
          Forgot password?
        </Link>
      </div>
    </form>
  )
}

export default Login
