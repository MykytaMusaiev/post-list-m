import React from 'react'
import PostList from '@/components/posts/PostList'
import { Post } from '@/lib/types'

export default function HomePage({ initialPosts }: { initialPosts: Post[] }) {
  const postsList = initialPosts
  return <PostList postsList={postsList} />
}
