import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

import Header from '@/containers/header'
import Loading from '@/components/common/loading'
import Link from 'next/link'

const Home = () => {
  const { data: ratings } = useSWR(`/api/ratings`, fetcher)

  return (
    <>
      <Header />
      <div>
        <div className="ratings">
          <h1>Latest Ratings</h1>
          {!ratings ? (
            <div className="center">
              <Loading />
            </div>
          ) : !ratings.data.length ? (
            <div>No Ratings</div>
          ) : (
            <ul>
              {ratings.data.map((rating) => (
                <li key={rating._id}>
                  <Link href={`/${rating.game_id}`}>
                    <a>{rating.game_name}</a>
                  </Link>{' '}
                  ({rating.rating}/5 stars)
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <style jsx>{`
        .ratings > ul {
          list-style: none;
        }
      `}</style>
    </>
  )
}

export default Home
