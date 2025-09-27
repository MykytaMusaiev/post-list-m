import { Comment } from '@/lib/types'
import CommentItem from './CommentItem'

export default function CommentsList({ comments }: { comments: Comment[] }) {
  console.dir({
    comments: comments,
  })
  return (
    <div className="ml-2">
      <h3 className="p-2">Comments</h3>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
