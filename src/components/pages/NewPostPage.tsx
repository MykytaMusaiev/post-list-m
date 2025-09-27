'use client'

import useDebounce from '@/hooks/useDebounce'
import { createPost } from '@/lib/api/jsonplaceholderService'
import { NewPostData, Post } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useUIStore } from '@/lib/store/uiStore'
import FloatingActionButton from '../FloatingActionButton'
import { FAB_CONFIG } from '@/lib/fabConfig'

const initialFormData: NewPostData = {
  title: '',
  body: '',
  userId: 1,
}

export default function NewPostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<NewPostData>(initialFormData)
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string
  }>({})

  const isLoading = useUIStore((state) => state.isLoading)
  const error = useUIStore((state) => state.error)
  const setLoading = useUIStore((state) => state.setLoading)
  const setError = useUIStore((state) => state.setError)
  const setSuccess = useUIStore((state) => state.setSuccess)

  const validateField = useCallback((name: string, value: string) => {
    if (!value.trim()) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: 'Це поле не може бути порожнім.',
      }))
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }, [])

  const debouncedValidate = useDebounce(validateField, 300)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    const trimmedValue = value.trimStart()

    setFormData((prev) => ({
      ...prev,
      [name]: trimmedValue,
    }))

    debouncedValidate(name, trimmedValue)

    if (error) {
      setError(null)
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.body.trim()) {
      setError("Будь ласка, заповніть усі обов'язкові поля.")
      return
    }
    setLoading(true)
    setError(null)

    try {
      const newPost: Post = await createPost(formData)
      setSuccess('Пост успішно створено!')
      router.push('/')
    } catch (err) {
      setError('Не вдалося створити пост. Спробуйте пізніше.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="max-w-xl w-[80%] mx-auto p-6
     bg-white shadow-xl rounded-lg mt-10 "
    >
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Введіть заголовок"
          type="text"
          name="title"
          required
          onChange={handleChange}
          onBlur={handleBlur}
          className={`mt-1 block w-full border rounded-md shadow-sm p-2 
      ${validationErrors.title ? 'border-red-500' : 'border-gray-300'}
      dark:text-amber-900
      `}
          disabled={isLoading}
        />
        <textarea
          name="body"
          placeholder="Введіть текст"
          required
          onChange={handleChange}
          onBlur={handleBlur}
          className={`mt-1 block w-full border rounded-md shadow-sm p-2 
      ${validationErrors.body ? 'border-red-500' : 'border-gray-300'}
      dark:text-amber-900
      `}
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white 
                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 transition-colors'}`}
        >
          {isLoading ? 'Створення...' : 'Опублікувати пост'}
        </button>
      </form>
      <FloatingActionButton {...FAB_CONFIG.HOME} />
    </div>
  )
}
