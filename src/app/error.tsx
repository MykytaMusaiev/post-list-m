'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error('Помилка App Router', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full border-l-4 border-red-500">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Упс! Сталася помилка.
        </h1>
        <p className="text-gray-700 mb-6">
          Виникла непередбачена проблема:{' '}
          <span className="font-mono text-sm bg-gray-100 p-1 rounded">
            {error.message}
          </span>
        </p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-150"
        >
          Спробувати знову
        </button>
      </div>
    </div>
  )
}
