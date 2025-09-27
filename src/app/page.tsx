import HomePage from '@/components/pages/HomePage'
import { getPosts } from '@/lib/api/jsonplaceholderService'

export default async function Home() {
  const posts = await getPosts()
  return <HomePage initialPosts={posts} />
}
