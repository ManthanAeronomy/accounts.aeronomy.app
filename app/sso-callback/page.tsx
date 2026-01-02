'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

export default function SSOCallbackPage() {
  const { isLoaded, user } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      // Send sign-in confirmation email
      fetch('/api/auth/sign-in-confirmation', {
        method: 'POST',
      }).catch((err) => {
        console.error('Failed to send sign-in confirmation:', err)
      })

      // Redirect to main app
      window.location.href = 'https://app.aeronomy.co'
    }
  }, [isLoaded, user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-900"></div>
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  )
}

