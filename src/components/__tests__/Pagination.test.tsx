jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}))

import { render, screen, fireEvent } from '@testing-library/react'
import PaginationControls from '../Pagination'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const pushMock = jest.fn()
const scrollToMock = jest.fn()
global.scrollTo = scrollToMock

const mockUseRouter = useRouter as jest.Mock
const mockUseSearchParams = useSearchParams as jest.Mock
const mockUsePathname = usePathname as jest.Mock

describe('PaginationControls', () => {
  const pathnameMock = '/posts'
  const limitQuery = 'limit=10'

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: pushMock })
    mockUsePathname.mockReturnValue(pathnameMock)
    mockUseSearchParams.mockReturnValue(new URLSearchParams(limitQuery))
    pushMock.mockClear()
    scrollToMock.mockClear()
  })

  test('should render null if totalPages is 1 or less', () => {
    const { container } = render(
      <PaginationControls currentPage={1} totalPages={1} />,
    )

    expect(container).toBeEmptyDOMElement()
  })

  test('should disable "First" and "Previous" buttons on the first page', () => {
    render(<PaginationControls currentPage={1} totalPages={10} />)

    const firstPageButton = screen.getByLabelText('First page')
    const previousButton = screen.getByLabelText('Previous page')
    const lastPageButton = screen.getByLabelText('Last page')

    expect(firstPageButton).toBeDisabled()
    expect(previousButton).toBeDisabled()

    expect(lastPageButton).not.toBeDisabled()
    expect(screen.getByLabelText('Next Page')).not.toBeDisabled()

    expect(screen.getByText('1')).toHaveClass('bg-blue-600')
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('should disable "Next" and "Last" buttons on the last page', () => {
    render(<PaginationControls currentPage={10} totalPages={10} />)

    const nextButton = screen.getByLabelText('Next Page')
    const lastPageButton = screen.getByLabelText('Last page')

    expect(nextButton).toBeDisabled()
    expect(lastPageButton).toBeDisabled()

    expect(screen.getByLabelText('Previous page')).not.toBeDisabled()

    expect(screen.getByText('10')).toHaveClass('bg-blue-600')
    expect(screen.getByText('9')).toBeInTheDocument()
  })

  test('should display surrounding page numbers (4, 5, 6) and enable all controls', () => {
    render(<PaginationControls currentPage={5} totalPages={10} />)

    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toHaveClass('bg-blue-600')
    expect(screen.getByText('6')).toBeInTheDocument()

    expect(screen.getByLabelText('First page')).not.toBeDisabled()
    expect(screen.getByLabelText('Last page')).not.toBeDisabled()
  })

  test('should navigate to the next page and scroll to top on "Next" click', () => {
    render(<PaginationControls currentPage={5} totalPages={10} />)

    const nextButton = screen.getByLabelText('Next Page')
    fireEvent.click(nextButton)

    expect(pushMock).toHaveBeenCalledWith('/posts?limit=10&page=6')
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  test('should navigate directly to the clicked page number and scroll', () => {
    render(<PaginationControls currentPage={5} totalPages={10} />)

    const targetPageButton = screen.getByText('4')
    fireEvent.click(targetPageButton)

    expect(pushMock).toHaveBeenCalledWith('/posts?limit=10&page=4')
    expect(scrollToMock).toHaveBeenCalled()
  })
})
