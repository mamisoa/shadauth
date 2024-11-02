'use client'

import { useActionState, useEffect } from "react"
import { FiArrowRight } from "react-icons/fi"
import Link from "next/link"
import { handleRegistration } from "@/src/_actions/registerAction"

export default function RegisterPage() {
  const [actionData, handleRegisterSubmit, isPending] = useActionState(
    handleRegistration,
    undefined
  )

  useEffect(() => {
    if (actionData) {
      console.log(actionData)
    }
  }, [actionData])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-white mb-2">Create Account</h2>
        <p className="text-center text-gray-400 mb-6">Fill in your details to register</p>

        <form action={handleRegisterSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
              defaultValue={actionData?.email as string}
            />
            {actionData?.errors?.email && (
              <p className="text-sm text-red-400 mt-1" role="alert">{actionData.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
            {actionData?.errors?.password && (
              <p className="text-sm text-red-400 mt-1" role="alert">{actionData.errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
            {actionData?.errors?.confirmPassword && (
              <p className="text-sm text-red-400 mt-1" role="alert">{actionData.errors.confirmPassword}</p>
            )}
          </div>

          {actionData?.errors?.general && (
            <p className="text-sm text-red-400" role="alert">{actionData.errors.general}</p>
          )}

          {actionData?.successMsg && (
            <div className="p-4 mb-4 text-sm text-green-400 bg-green-900 rounded-lg" role="alert">
              <span className="font-medium">Success!</span> {actionData.successMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out flex items-center justify-center"
          >
            {isPending ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <FiArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-blue-500 hover:text-blue-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}