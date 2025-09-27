import axios from 'axios'
import { NewPostData, Post, PostDetails, RouteParamId } from '../types'

const POSTS_LIMI = 20
const BASE_URL = 'https://jsonplaceholder.typicode.com'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts?_limit=${POSTS_LIMI}`, {
    next: { revalidate: 60 },
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
  const postUrl = `${BASE_URL}/posts/${id}`
  const commentsUrl = `${BASE_URL}/posts/${id}/comments`

  const [postData, commData] = await Promise.all([
    fetch(postUrl, { next: { revalidate: 60 } }),
    fetch(commentsUrl, { next: { revalidate: 60 } }),
  ])

  if (!postData.ok) {
    throw new Error('Пост не знайдено.')
  }

  const [post, comments] = await Promise.all([postData.json(), commData.json()])

  return { post, comments }
}

export const createPost = async (postData: NewPostData): Promise<Post> => {
  const response = await api.post<Post>('/posts', postData)
  return response.data
}
