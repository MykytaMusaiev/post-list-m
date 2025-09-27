import { PostDetails } from '@/lib/types'
import PostItem from './PostItem'
import CommentsList from '../comments/CommentsList'

export default function PostDetailsView({ details }: { details: PostDetails }) {
  const { post, comments } = details
  return (
    <div className="p-4 m-4">
      <PostItem post={post} />
      <CommentsList comments={comments} />
    </div>
  )
}
