import { UIState } from '@/lib/store/uiStore'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/lib/api/jsonplaceholderService', () => ({
  createPost: jest.fn(),
}))

const mockUseUIStore = jest.fn()
jest.mock('@/lib/store/uiStore', () => ({
  useUIStore: (selector: (state: UIState) => unknown) =>
    mockUseUIStore(selector),
}))

jest.mock('@/hooks/useDebounce', () => ({
  __esModule: true,
  default: (fn: (...args: unknown[]) => unknown, delay: number): typeof fn =>
    fn,
}))

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import NewPostPage from '../NewPostPage'
import { useRouter } from 'next/navigation'
import { createPost } from '@/lib/api/jsonplaceholderService'

const mockUseRouter = useRouter as jest.Mock
const pushMock = jest.fn()

const MOCK_NEW_POST = { title: 'Test Title', body: 'Test Body', userId: 1 }
const MOCK_CREATED_POST = { id: 101, ...MOCK_NEW_POST }

const mockStoreState = {
  isLoading: false,
  error: null,
  setLoading: jest.fn(),
  setError: jest.fn(),
  setSuccess: jest.fn(),
}

describe('NewPostPage', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: pushMock })
    mockUseUIStore.mockImplementation((selector) => selector(mockStoreState))

    jest.clearAllMocks()
    mockStoreState.setError.mockClear()
    mockStoreState.setLoading.mockClear()
    mockStoreState.setSuccess.mockClear()
    ;(createPost as jest.Mock).mockClear()
    Object.assign(mockStoreState, {
      isLoading: false,
      error: null,
    })
  })

  test('should succesfully sumbit form, call API, and navigate ot home', async () => {
    ;(createPost as jest.Mock).mockResolvedValueOnce(MOCK_CREATED_POST)

    render(<NewPostPage />)

    const titleInput = screen.getByPlaceholderText('Enter title')
    const bodyTextArea = screen.getByPlaceholderText('Enter text')
    const submitButton = screen.getByRole('button', { name: 'Create new post' })

    fireEvent.change(titleInput, {
      target: { name: 'title', value: MOCK_NEW_POST.title },
    })
    fireEvent.change(bodyTextArea, {
      target: { name: 'body', value: MOCK_NEW_POST.body },
    })
    fireEvent.click(submitButton)

    expect(mockStoreState.setLoading).toHaveBeenCalledWith(true)
    expect(mockStoreState.setError).toHaveBeenCalledWith(null)

    await waitFor(() => {
      expect(createPost as jest.Mock).toHaveBeenCalledWith(MOCK_NEW_POST)
      expect(mockStoreState.setSuccess).toHaveBeenCalledWith(
        'Post created succesfully!',
      )
      expect(pushMock).toHaveBeenCalledWith('/')
      expect(mockStoreState.setLoading).toHaveBeenCalledWith(false)
    })
  })

  test('should display error message on API failure', async () => {
    ;(createPost as jest.Mock).mockRejectedValueOnce(new Error('API error'))

    render(<NewPostPage />)

    const titleInput = screen.getByPlaceholderText('Enter title')
    const bodyTextarea = screen.getByPlaceholderText('Enter text')
    const submitButton = screen.getByText('Publish your post')

    fireEvent.change(titleInput, {
      target: { name: 'title', value: MOCK_NEW_POST.title },
    })
    fireEvent.change(bodyTextarea, {
      target: { name: 'body', value: MOCK_NEW_POST.body },
    })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(createPost as jest.Mock).toHaveBeenCalled()
      expect(mockStoreState.setError).toHaveBeenCalledWith(
        'Post creation failed. Try again later.',
      )
      expect(pushMock).not.toHaveBeenCalled()
      expect(mockStoreState.setLoading).toHaveBeenCalledWith(false)
    })
  })

  test('should prevent form submission if fields are empty', () => {
    render(<NewPostPage />)

    const formElement = screen.getByRole('form', { name: 'Create post form' })
    fireEvent.submit(formElement)

    expect(mockStoreState.setError).toHaveBeenCalledWith(
      'Please fill all required fields.',
    )
    expect(createPost as jest.Mock).not.toHaveBeenCalled()
    expect(mockStoreState.setLoading).not.toHaveBeenCalled()
  })

  test('should show validation error on blur if field is empty', async () => {
    render(<NewPostPage />)
    const titleInput = screen.getByPlaceholderText('Enter title')

    fireEvent.blur(titleInput, { target: { name: 'title', value: '' } })

    await waitFor(() => {
      expect(screen.getByText(/Fill this field!/i)).toBeInTheDocument()
    })

    fireEvent.change(titleInput, { target: { name: 'title', value: 'a' } })
    fireEvent.blur(titleInput, { target: { name: 'title', value: 'a' } })

    await waitFor(() => {
      expect(screen.queryByText(/Fill this field!/i)).not.toBeInTheDocument()
    })
  })
})
