import PostDetails from '@/components/posts/PostDetailsView'
import { getPostAndComments } from '@/lib/api/jsonplaceholderService'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: {
    id: string
  }
}

export default async function SinglePost(props: PostPageProps) {
  const { id } = await props.params
  const details = await getPostAndComments(id)

  if (!details) {
    notFound()
  }
  return <PostDetails details={details} />
}
