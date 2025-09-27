import React from 'react'
import PostList from '@/components/posts/PostList'
import { Post } from '@/lib/types'
import FloatingActionButton from '../FloatingActionButton'
import { FAB_CONFIG } from '@/lib/fabConfig'

export default function HomePage({ initialPosts }: { initialPosts: Post[] }) {
  const postsList = initialPosts
  return (
    <div className="m-4">
      <PostList postsList={postsList} />
      <FloatingActionButton {...FAB_CONFIG.CREATE} />
    </div>
  )
}
