import React from 'react'
import PostList from '@/components/posts/PostList'
import { Post } from '@/lib/types'
import FloatingActionButton from '../FloatingActionButton'

export default function HomePage({ initialPosts }: { initialPosts: Post[] }) {
  const postsList = initialPosts
  return (
    <div className="m-4">
      <FloatingActionButton href={'/posts/new'}>+</FloatingActionButton>
      <PostList postsList={postsList} />
    </div>
  )
}
