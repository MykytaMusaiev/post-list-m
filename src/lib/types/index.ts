export type RouteParamId = Post['id'] | string

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export interface NewPostData {
  title: string
  body: string
  userId: number
}

export interface PostDetails {
  post: Post
  comments: Comment[]
}

export interface FabConfig {
  href: string
  label: string
  icon: string
  bgColor: string
  hoverBgColor: string
}

export interface AppConfig {
  defaultLimit: number
  limitOptions: number[]
  skeletonTestingDelay: number
  baseUrl: string
  validationPeriod: number
  limitForSecondPagination: number
}

export interface PaginatedPosts {
  posts: Post[]
  totalCount: number
}
