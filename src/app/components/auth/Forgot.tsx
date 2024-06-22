'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { forgotPassword } from 'src/app/lib/authActions'

export default function CreateAccount() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await forgotPassword(new FormData(event.currentTarget))
      setFormMessage(
        'If there is an account associated with this email, a reset password link has been sent to it.',
      )
    } catch (error: any) {
      setErrorMessage(error || 'An error occurred.')
    }
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
      <div>{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div>
      <div>{formMessage && <p>{formMessage}</p>}</div>
      <button
        aria-disabled={isSubmitting}
        type="submit"
        disabled={isSubmitting}
        className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
      </button>
    </form>
  )
}
