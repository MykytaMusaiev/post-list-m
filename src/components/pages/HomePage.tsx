import React from 'react'
import PostList from '@/components/posts/PostList'
import { Post } from '@/lib/types'
import FloatingActionButton from '../FloatingActionButton'
import { FAB_CONFIG } from '@/lib/fabConfig'
import LimitSelector from '../LimitSelector'
import { APP_CONFIG } from '@/lib/constants'
import Pagination from '../Pagination'

interface HomePageProps {
  initialPosts: Post[]
  postsLimit: number
  currentPage: number
  totalPages: number
}

export default function HomePage({
  initialPosts,
  postsLimit,
  currentPage,
  totalPages,
}: HomePageProps) {
  const POSTS_LIMIT_THRESHOLD = APP_CONFIG.limitForSecondPagination
  const shouldShowPagination = postsLimit >= POSTS_LIMIT_THRESHOLD
  return (
    <div className="m-4">
      <LimitSelector currentLimit={postsLimit} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        isHidden={!shouldShowPagination}
      />
      <PostList postsList={initialPosts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />

      <FloatingActionButton {...FAB_CONFIG.CREATE} />
    </div>
  )
}
