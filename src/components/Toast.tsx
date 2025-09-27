'use client'

import { useUIStore } from '@/lib/store/uiStore'
import { useEffect } from 'react'

const useUISelectors = () => ({
  error: useUIStore((state) => state.error),
  successMessage: useUIStore((state) => state.successMessage),
  setError: useUIStore((state) => state.setError),
  setSuccess: useUIStore((state) => state.setSuccess),
})

export default function Toast() {
  const { error, successMessage, setError, setSuccess } = useUISelectors()

  const isVisible = !!error || !!successMessage
  const message = error || successMessage
  const isError = !!error

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setError(null)
        setSuccess(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, setError, setSuccess])

  if (!isVisible) return null

  const baseClasses =
    'fixed top-5 right-5 p-4 rounded-lg shadow-2xl transition-all duration-300 transform z-[100]'

  const styleClasses = isError
    ? 'bg-red-500 text-white'
    : 'bg-green-500 text-white'

  const handleClose = () => {
    setError(null)
    setSuccess(null)
  }

  return (
    <div
      className={`${baseClasses} ${styleClasses} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="flex items-center justify-between space-x-4">
        <p>{message}</p>
        <button
          onClick={handleClose}
          className="text-lg font-bold ml-4"
          aria-label="Закрити сповіщення"
        >
          &times;
        </button>
      </div>
    </div>
  )
}
