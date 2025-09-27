'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { APP_CONFIG } from '@/lib/constants'

export default function LimitSelector({
  currentLimit,
}: {
  currentLimit: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      params.set(name, value)
      params.set('page', '1')

      return params.toString()
    },
    [searchParams],
  )

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = event.target.value

    router.push(pathname + '?' + createQueryString('limit', newLimit))
  }

  return (
    <div className="flex items-center justify-center">
      <label
        htmlFor="limit-select"
        className="mr-3 text-gray-700 dark:text-gray-900 text-sm whitespace-nowrap"
      >
        Pages per page:
      </label>
      <select
        id="limit-select"
        value={currentLimit}
        onChange={handleLimitChange}
        className="
                    py-1.5 px-3 
                    border border-gray-300 
                    rounded-lg shadow-md 
                    focus:ring-blue-500 focus:border-blue-500 
                    bg-white 
                    transition duration-150 ease-in-out  text-gray-700
                    appearance-none 
                    bg-select-arrow
                    w-18
                "
      >
        {APP_CONFIG.limitOptions.map((limit) => (
          <option key={limit} value={limit} className=" text-gray-700">
            {limit}
          </option>
        ))}
      </select>
    </div>
  )
}
