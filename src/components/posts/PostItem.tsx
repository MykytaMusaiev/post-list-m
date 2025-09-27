import { Post } from '@/lib/types'

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className="border-2 border-amber-200">
      <h3 className="text-xl pb-4">{post.title}</h3>
      <p>{post.body}</p>
    </div>
  )
}
