import { PostDetails } from '@/lib/types'
import PostItem from './PostItem'
import CommentsList from '../comments/CommentsList'
import FloatingActionButton from '../FloatingActionButton'
import { FAB_CONFIG } from '@/lib/fabConfig'

export default function PostDetailsView({ details }: { details: PostDetails }) {
  const { post, comments } = details
  return (
    <div className="mt-4 mx-8">
      <PostItem post={post} />
      <CommentsList comments={comments} />
      <FloatingActionButton {...FAB_CONFIG.HOME} />
    </div>
  )
}
