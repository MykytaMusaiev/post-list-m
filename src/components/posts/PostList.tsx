import { Post } from '@/lib/types'
import PostItem from './PostItem'
import Link from 'next/link'

export default function PostList({ postsList }: { postsList: Post[] }) {
  return (
    <>
      {postsList.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <PostItem post={post} />
        </Link>
      ))}
    </>
  )
}
