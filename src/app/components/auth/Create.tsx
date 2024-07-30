'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { createUser } from '@/app/lib/auth'

export default function CreateAccount() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verifyMessage, setVerifyMessage] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const result = await createUser(new FormData(event.currentTarget))
      setVerifyMessage(result)
      setIsVerifying(true)
    } catch (error: any) {
      console.log('error is', error)
      setErrorMessage(error.message || 'An error occurred.')
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
        minLength={8}
        onChange={handleChange}
        value={formData.password}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div>{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div>
      <div>{verifyMessage && <p className="">{verifyMessage}</p>}</div>
      <button
        aria-disabled={isSubmitting || isVerifying}
        type="submit"
        disabled={isSubmitting || isVerifying}
        className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
      >
        {isSubmitting || isVerifying ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  )
}
