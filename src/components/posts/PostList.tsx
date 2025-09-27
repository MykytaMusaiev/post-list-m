import { Post } from '@/lib/types'
import PostItem from './PostItem'

export default function PostList({ postsList }: { postsList: Post[] }) {
  return (
    <>
      {postsList.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  )
}
