jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}))

jest.mock('@/lib/constants', () => ({
  APP_CONFIG: {
    limitOptions: [5, 10, 15, 20, 25],
    baseUrl: 'mocked-base-url',
  },
}))

import { render, screen, fireEvent } from '@testing-library/react'
import LimitSelector from '@/components/LimitSelector'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const mockUseRouter = useRouter as jest.Mock
const mockUseSearchParams = useSearchParams as jest.Mock
const mockUsePathname = usePathname as jest.Mock

describe('LimitSelector', () => {
  const pushMock = jest.fn()
  const pathnameMock = '/posts'
  const labelText = 'Pages per page:'

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: pushMock })
    mockUsePathname.mockReturnValue(pathnameMock)

    pushMock.mockClear()
    mockUseSearchParams.mockClear()
  })

  test('should display the current limit value passed via props', () => {
    const currentLimit = 15

    mockUseSearchParams.mockReturnValue(new URLSearchParams(''))

    render(<LimitSelector currentLimit={currentLimit} />)
    const selectElement = screen.getByLabelText(labelText)

    expect(selectElement).toHaveValue(currentLimit.toString())

    expect(screen.getByText(labelText)).toBeInTheDocument()
  })

  test('should update URL with new limit and reset page to 1', () => {
    const initialLimit = 10
    const newLimit = '25'

    mockUseSearchParams.mockReturnValue(new URLSearchParams('limit=10&page=5'))

    render(<LimitSelector currentLimit={initialLimit} />)

    const selectElement = screen.getByLabelText(labelText)

    fireEvent.change(selectElement, { target: { value: newLimit } })

    expect(pushMock).toHaveBeenCalledTimes(1)

    const expectedQueryString = `?limit=${newLimit}&page=1`
    expect(pushMock).toHaveBeenCalledWith(pathnameMock + expectedQueryString)
  })

  test('should preserve other URL parameters when changing the limit', () => {
    const initialLimit = 10
    const newLimit = '20'

    mockUseSearchParams.mockReturnValue(
      new URLSearchParams('limit=10&page=3&q=test'),
    )

    render(<LimitSelector currentLimit={initialLimit} />)

    const selectElement = screen.getByLabelText(labelText)

    fireEvent.change(selectElement, { target: { value: newLimit } })

    const expectedQueryString = `?limit=${newLimit}&page=1&q=test`
    expect(pushMock).toHaveBeenCalledWith(pathnameMock + expectedQueryString)
  })
})
