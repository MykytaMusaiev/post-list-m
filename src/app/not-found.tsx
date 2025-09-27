'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NotFound() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        Сторінку не знайдено
      </h2>
      <p className="text-gray-500 mb-8">
        Вибачте, ми не змогли знайти сторінку за адресою{' '}
        <strong className="text-gray-800 break-words">{pathname}</strong>.
      </p>
      <Link href="/" passHref>
        <button className="cursor-pointer py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
          Повернутися на головну
        </button>
      </Link>
    </div>
  )
}
