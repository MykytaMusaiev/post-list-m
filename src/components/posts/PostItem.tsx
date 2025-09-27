import { Post } from '@/lib/types'
import Link from 'next/link'

export default function PostItem({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="border-2 border-amber-200 p-4 m-4">
        <h3 className="">{post.title}</h3>
        <p>{post.body}</p>
      </div>
    </Link>
  )
}
