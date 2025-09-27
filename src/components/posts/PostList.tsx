import { Post } from '@/lib/types'
import PostItem from './PostItem'
import Link from 'next/link'

export default function PostList({ postsList }: { postsList: Post[] }) {
  return (
    <div className="">
      {postsList.map((post) => (
        <div key={post.id} className="m-4">
          <Link href={`/posts/${post.id}`}>
            <PostItem post={post} />
          </Link>
        </div>
      ))}
    </div>
  )
}
