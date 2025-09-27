import { Comment } from '@/lib/types'

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="border-2 border-sky-300 my-4 p-2">
      <p className="capitalize">Name: {comment.name}</p>
      <p>Email: {comment.email}</p>
      <p>{comment.body}</p>
    </div>
  )
}
