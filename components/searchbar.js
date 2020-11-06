import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
const Loading = dynamic(() => import('@/components/common/loading'))

const Searchbar = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const [search, setSearch] = useState('')
  const { data: games } = useSWR(
    (search &&
      `${process.env.VERCEL_URL}/api/games?search=${search}&page=${pageIndex}`) ||
      `http://localhost:3000/api/games?search=${search}&page=${pageIndex}`,
    fetcher
  )

  return (
    <>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search for games..."
          className={search ? 'searchbar-input active' : 'searchbar-input'}
          value={search}
          onChange={(e) => {
            setPageIndex(1)
            setSearch(e.target.value)
          }}
        />

        {search && (
          <div className="searchbar-dropdown">
            <ul>
              {!games ? (
                <li className="loader">
                  <Loading />
                </li>
              ) : (
                games?.data?.results.map((game) => (
                  <li key={game.id}>
                    <Link href={`/${game.id}`}>
                      <a onClick={() => setSearch('')}>
                        {game?.background_image && (
                          <Image
                            src={game.background_image}
                            width={50}
                            height={70}
                            alt={game.name}
                          />
                        )}

                        <div>
                          <p>
                            {game?.name} (
                            {game?.released
                              ? game.released.split('-')[0]
                              : 'N/A'}
                            )
                          </p>
                          <ul className="genres">
                            {game?.genres.map((genre, index) => (
                              <li key={index}>{genre?.name}</li>
                            ))}
                          </ul>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))
              )}
              {games && games?.data.next !== null && (
                <button
                  className="button-next"
                  onClick={() => {
                    setPageIndex(pageIndex + 1)
                  }}
                >
                  Next Page
                </button>
              )}
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        .searchbar {
          position: relative;
          height: 5.2rem;
          flex-grow: 1;
        }

        .searchbar-input {
          height: inherit;
          width: 100%;
          padding: 0 10rem;
          text-align: center;
          font-size: 1.8rem;
          transition: border 0.2s ease-in-out;

          border-radius: ${search ? '1.6rem 1.6rem 0 0' : '100rem'};
          background-color: var(--color-gray);
          border: 0.1rem solid var(--color-gray-2);
        }

        .searchbar-input::placeholder {
          opacity: 0.8;
          color: var(--color-gray-4);
        }

        .searchbar-input:focus::placeholder {
          opacity: 0;
        }

        .searchbar-input:focus {
          border: 0.1rem solid var(--color-gray-3);
        }

        .searchbar-input.active {
          border: 0.1rem solid var(--color-gray-3);
        }

        .searchbar-dropdown {
          position: absolute;
          top: 5.2rem;
          left: 0;
          z-index: 10;
          width: 100%;
          background-color: var(--color-gray);
          border: 0.1rem solid var(--color-gray-3);
          border-top: none;
        }

        .searchbar-dropdown > ul {
          display: flex;
          flex-direction: column;
          list-style: none;
        }

        .searchbar-dropdown > ul > li {
          min-height: 11rem;
        }

        .searchbar-dropdown > ul > li + li {
          border-top: 0.1rem solid var(--color-gray-3);
        }

        .searchbar-dropdown > ul > li > a {
          display: flex;
          align-items: center;
          gap: 4rem;
          min-height: 11rem;
          padding: 0 2rem;
          font-size: 1.8rem;
          font-weight: 700;
          color: currentColor;
          text-decoration: none;
          transition: background-color 0.2s ease-in-out;
        }

        .searchbar-dropdown > ul > li > a:hover {
          background-color: var(--color-gray-2);
        }

        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .genres {
          display: flex;
          gap: 0.6rem;
          list-style: none;
          font-weight: 400;
          font-size: 1.6rem;
        }

        .genres li:not(:last-child):after {
          content: ',';
        }

        .button-next {
          min-height: 11rem;
          border: none;
          cursor: pointer;
          background-color: var(--color-gray);
          border-top: 0.1rem solid var(--color-gray-3);
          font-weight: 700;
          font-size: 2rem;
          transition: background-color 0.2s ease-in-out;
        }

        .button-next:hover {
          background-color: var(--color-gray-2);
        }
      `}</style>
    </>
  )
}

export default Searchbar
