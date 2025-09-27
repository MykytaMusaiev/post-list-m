import PostDetails from '@/components/posts/PostDetailsView'
import { getPostAndComments } from '@/lib/api/jsonplaceholderService'

interface PostPageProps {
  params: {
    id: string
  }
}

export default async function SinglePost(props: PostPageProps) {
  const { id } = await props.params
  const details = await getPostAndComments(id)
  return <PostDetails details={details} />
}
