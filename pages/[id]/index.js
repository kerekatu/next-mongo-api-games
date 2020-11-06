import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { useRouter } from 'next/router'

import Header from '@/containers/header'
import GameDetails from '@/components/game-details'

const Game = () => {
  const router = useRouter()
  const { data: game } = useSWR(
    `${process.env.VERCEL_URL}/api/games/${router.query.id}` ||
      `http://localhost:3000/api/games/${router.query.id}`,
    fetcher
  )
  const { data: rating } = useSWR(
    `${process.env.VERCEL_URL}/api/ratings?id=${router.query.id}` ||
      `http://localhost:3000/api/ratings?id=${router.query.id}`,
    fetcher,
    {
      refreshInterval: 500
    }
  )

  return (
    <>
      <Header />
      <GameDetails gameData={game} ratingData={rating} />
    </>
  )
}

export default Game
