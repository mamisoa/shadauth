'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { LuAlertCircle } from "react-icons/lu";


export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages: { [key: string]: string } = {
    Configuration: "There is a problem with the server configuration. Please contact support.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification token has expired or has already been used.",
    Default: "An unexpected authentication error occurred.",
  }

  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <LuAlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">Authentication Error</h2>
        </div>
        <div className="rounded-md bg-gray-800 p-6 shadow-lg">
          <p className="text-center text-red-400 mb-4">{errorMessage}</p>
          <p className="text-gray-400 text-sm text-center mb-6">
            Error code: {error || 'Unknown'}
          </p>
          <div className="flex justify-center">
            <Link
              href="/auth/sign-in"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}