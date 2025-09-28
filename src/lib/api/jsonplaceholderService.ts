import axios from 'axios'
import {
  NewPostData,
  PaginatedPosts,
  Post,
  PostDetails,
  RouteParamId,
} from '../types'
import { APP_CONFIG } from '../constants'

const api = axios.create({
  baseURL: APP_CONFIG.baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getPosts = async (
  page: number = 1,
  limit: number = APP_CONFIG.defaultLimit,
): Promise<PaginatedPosts> => {
  if (APP_CONFIG.skeletonTestingDelay > 0) {
    await delay(APP_CONFIG.skeletonTestingDelay)
  }

  const url = `${APP_CONFIG.baseUrl}/posts?_page=${page}&_limit=${limit}`

  try {
    const response = await fetch(url, {
      next: { revalidate: APP_CONFIG.validationPeriod },
    })

    if (!response.ok) {
      const status = response.status || 'Мережева помилка'
      const errorMessage = `Помилка ${status}: Не вдалося отримати список постів.`
      throw new Error(errorMessage)
    }

    const totalCountHeader = response.headers.get('x-total-count')
    const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : 100

    const posts = (await response.json()) as Post[]

    return { posts, totalCount }
  } catch (error) {
    throw error
  }
}

export const getPostAndComments = async (
  id: RouteParamId,
): Promise<PostDetails> => {
  await delay(APP_CONFIG.skeletonTestingDelay)

  const postUrl = `${APP_CONFIG.baseUrl}/posts/${id}`
  const commentsUrl = `${APP_CONFIG.baseUrl}/posts/${id}/comments`

  const [postData, commData] = await Promise.all([
    fetch(postUrl, { next: { revalidate: APP_CONFIG.validationPeriod } }),
    fetch(commentsUrl, { next: { revalidate: APP_CONFIG.validationPeriod } }),
  ])

  if (!postData.ok) {
    throw new Error('Пост не знайдено.')
  }

  const [post, comments] = await Promise.all([postData.json(), commData.json()])

  return { post, comments }
}

export const createPost = async (postData: NewPostData): Promise<Post> => {
  const response = await api.post<Post>('/posts', postData)
  await delay(APP_CONFIG.skeletonTestingDelay)
  return response.data
}
