import { Post } from '@/lib/types'

export default function PostItem({ post }: { post: Post }) {
  return (
    <div
      className="block p-6 mb-4 bg-white rounded-xl shadow-lg
    hover:shadow-xl transition-shadow duration-300
    border border-gray-100
    "
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
        {post.title}
      </h2>
      <p className="text-gray-600 line-clamp-2">{post.body}</p>
    </div>
  )
}
