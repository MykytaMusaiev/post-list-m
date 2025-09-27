import axios from 'axios'
import { NewPostData, Post, PostDetails, RouteParamId } from '../types'
import {
  BASE_URL,
  POSTS_LIMI,
  SKELETON_TESTING_DELAY,
  VALIDATION_PERIOD,
} from '../constants'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getPosts = async (): Promise<Post[]> => {
  await delay(SKELETON_TESTING_DELAY)

  const response = await fetch(`${BASE_URL}/posts?_limit=${POSTS_LIMI}`, {
    next: { revalidate: VALIDATION_PERIOD },
  })

  if (!response.ok) {
    const status = response.status || 'Мережева помилка'
    const errorMessage = `Помилка ${status}: Не вдалося отримати список постів.`

    throw new Error(errorMessage)
  }

  const data = (await response.json()) as Post[]
  return data
}

export const getPostAndComments = async (
  id: RouteParamId,
): Promise<PostDetails> => {
  await delay(SKELETON_TESTING_DELAY)

  const postUrl = `${BASE_URL}/posts/${id}`
  const commentsUrl = `${BASE_URL}/posts/${id}/comments`

  const [postData, commData] = await Promise.all([
    fetch(postUrl, { next: { revalidate: VALIDATION_PERIOD } }),
    fetch(commentsUrl, { next: { revalidate: VALIDATION_PERIOD } }),
  ])

  if (!postData.ok) {
    throw new Error('Пост не знайдено.')
  }

  const [post, comments] = await Promise.all([postData.json(), commData.json()])

  return { post, comments }
}

export const createPost = async (postData: NewPostData): Promise<Post> => {
  const response = await api.post<Post>('/posts', postData)
  await delay(SKELETON_TESTING_DELAY)
  return response.data
}
