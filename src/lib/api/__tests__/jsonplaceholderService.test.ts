import { getPosts } from '@/lib/api/jsonplaceholderService'
import { APP_CONFIG } from '@/lib/constants'
import { Post } from '@/lib/types'

global.fetch = jest.fn()

describe('jsonplaceholderService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockSuccessfulFetch = (mockPosts: Post[], totalCount: number) => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
      headers: {
        get: jest.fn((header: string) => {
          if (header.toLowerCase() === 'x-total-count') {
            return totalCount.toString()
          }
          return null
        }),
      } as unknown as Headers,
    })
  }

  test('should fetch posts with correct pagination parameters and total count', async () => {
    const mockPosts: Post[] = [
      { id: 1, userId: 1, title: 'Test Post', body: '...' },
    ]
    const totalCount = 100

    mockSuccessfulFetch(mockPosts, totalCount)

    const page = 5
    const limit = 20
    const result = await getPosts(page, limit)

    expect(fetch).toHaveBeenCalledWith(
      `${APP_CONFIG.baseUrl}/posts?_page=${page}&_limit=${limit}`,
      expect.any(Object),
    )

    expect(result.posts).toEqual(mockPosts)
    expect(result.totalCount).toBe(totalCount)
  })

  test('should throw an error on failed fetch response', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    })

    await expect(getPosts(1, 10)).rejects.toThrow(
      'Помилка 404: Не вдалося отримати список постів.',
    )
  })

  test('should use default page and limit if not provided', async () => {
    const mockPosts: Post[] = []
    const totalCount = 100

    mockSuccessfulFetch(mockPosts, totalCount)

    await getPosts()

    expect(fetch).toHaveBeenCalledWith(
      `${APP_CONFIG.baseUrl}/posts?_page=1&_limit=${APP_CONFIG.defaultLimit}`,
      expect.any(Object),
    )
  })
})
