import { Comment } from '@/lib/types'

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="border-l-4 border-sky-500 my-4 p-4 pl-6 bg-gray-50 rounded-lg shadow-sm">
      <div className="mb-2">
        <p className="capitalize text-lg font-semibold text-gray-800">
          Name: {comment.name}
        </p>
        <p className="text-sm text-blue-600">Email: {comment.email}</p>
      </div>
      <p className="text-gray-700">{comment.body}</p>
    </div>
  )
}
