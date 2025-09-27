'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  isHidden?: boolean
}

export default function PaginationControls({
  currentPage,
  totalPages,
  isHidden = false,
}: PaginationControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  const createQueryString = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', newPage.toString())
      return params.toString()
    },
    [searchParams],
  )

  const navigate = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(pathname + '?' + createQueryString(newPage))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const baseButtonClass =
    'px-3 py-1.5 border border-gray-300 border-r-0 border-l-0 font-bold transition duration-150'
  const activeClass = 'bg-blue-600 text-white border-blue-600 shadow-md'
  const inactiveClass =
    'bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 disabled:text-blue-300 disabled:hover:bg-white'

  const renderPageNumbers = () => {
    const pagesToShow = []
    const startPage = Math.max(1, currentPage - 1)
    const endPage = Math.min(totalPages, currentPage + 1)

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage
      pagesToShow.push(
        <button
          key={i}
          onClick={() => navigate(i)}
          className={`
                    ${baseButtonClass} 
                    ${isActive ? activeClass : inactiveClass}
                `}
        >
          {i}
        </button>,
      )
    }
    return pagesToShow
  }

  if (totalPages <= 1) {
    return null
  }

  const visibilityClass = isHidden ? 'invisible' : ''

  return (
    <div className="flex justify-center py-2">
      <div
        className={`
            inline-flex items-center justify-center my-2 
            border border-gray-300 rounded-lg overflow-hidden
            shadow-sm transition
                ${visibilityClass}`}
      >
        <button
          onClick={() => navigate(1)}
          disabled={isFirst}
          className={`${baseButtonClass} ${inactiveClass}`}
        >
          &lt;&lt;
        </button>
        <button
          disabled={isFirst}
          onClick={() => navigate(currentPage - 1)}
          className={`${baseButtonClass} ${inactiveClass}`}
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => navigate(currentPage + 1)}
          disabled={isLast}
          className={`${baseButtonClass} ${inactiveClass}`}
        >
          &gt;
        </button>
        <button
          onClick={() => navigate(totalPages)}
          disabled={isLast}
          className={`${baseButtonClass} ${inactiveClass}`}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  )
}
