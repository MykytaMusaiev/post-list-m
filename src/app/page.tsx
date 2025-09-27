import HomePage from '@/components/pages/HomePage'
import { getPosts } from '@/lib/api/jsonplaceholderService'
import { APP_CONFIG } from '@/lib/constants'

interface HomePageProps {
  searchParams: {
    page?: string
    limit?: string
  }
}

export default async function Home({ searchParams }: HomePageProps) {
  const limitParam = searchParams.limit
  let postsLimit: number
  if (!limitParam || isNaN(parseInt(limitParam, 10))) {
    postsLimit = APP_CONFIG.defaultLimit
  } else {
    postsLimit = parseInt(limitParam, 10)
  }
  if (!APP_CONFIG.limitOptions.includes(postsLimit)) {
    postsLimit = APP_CONFIG.defaultLimit
  }
  const currentPage = parseInt(searchParams.page || '1', 10)

  const { posts, totalCount } = await getPosts(currentPage, postsLimit)
  const totalPages = Math.ceil(totalCount / postsLimit)

  return (
    <HomePage
      initialPosts={posts}
      postsLimit={postsLimit}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}
