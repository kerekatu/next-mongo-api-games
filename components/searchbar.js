import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import Link from 'next/link'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Searchbar = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const [search, setSearch] = useState('')
  const { data: games, error } = useSWR(
    search.length > 2 &&
      `http://localhost:3000/api/games?search=${search}&page=${pageIndex}`,
    fetcher
  )

  useEffect(() => {
    setPageIndex(1)
  }, [search])

  console.log(games)

  return (
    <>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search for games"
          className="searchbar-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.length > 2 && (
          <div className="searchbar-dropdown">
            <ul>
              {!games ? (
                <div>Loading...</div>
              ) : (
                games?.data?.results.map((game) => (
                  <li key={game.id}>
                    <Link href={`/${game.id}`}>
                      <a>
                        {game.background_image && (
                          <Image
                            src={game.background_image}
                            width={80}
                            height={100}
                            alt={game.name}
                            className="thumbnail"
                          />
                        )}

                        <p>{game.name}</p>
                      </a>
                    </Link>
                  </li>
                ))
              )}
              {games && games?.data.next !== null && (
                <button
                  className="button-next"
                  onClick={() => setPageIndex(pageIndex + 1)}
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
          width: inherit;
        }

        .searchbar-input {
          padding: 2rem 4rem;
          text-align: center;
          font-size: 2rem;
          border-radius: ${search.length > 2 ? '1.6rem 1.6rem 0 0' : '100rem'};
          width: inherit;
          background-color: #f1f1f1;
          border: 0.1rem solid #ddd;
          border-bottom: ${search.length > 2 && 'none'};
        }

        .searchbar-input:focus::placeholder {
          opacity: 0;
        }

        .searchbar-dropdown {
          background-color: #f1f1f1;
          border: 0.1rem solid #ddd;
        }

        .searchbar-dropdown ul {
          display: flex;
          flex-direction: column;
          list-style: none;
        }

        .searchbar-dropdown li > a {
          display: flex;
          align-items: center;
          gap: 4rem;
          font-size: 2.4rem;
          padding: 3rem 4rem;
          color: currentColor;
          text-decoration: none;
          transition: background-color 0.2s ease-in-out;
        }

        .searchbar-dropdown li > a:hover {
          background-color: #f9f9f9;
        }

        .button-next {
          padding: 6rem;
          border: none;
          cursor: pointer;
          background-color: #f9f9f9;
        }
      `}</style>
    </>
  )
}

export default Searchbar
