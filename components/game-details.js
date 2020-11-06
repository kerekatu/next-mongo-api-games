import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
const Loading = dynamic(() => import('@/components/common/loading'))

const GameDetails = ({ gameData, ratingData }) => {
  const [stars, setStars] = useState(null)
  const STARS_OPTIONS = [1, 2, 3, 4, 5]

  const ratingController = (rating) => {
    if (!ratingData?.data) {
      addRating(rating)
    } else if (rating === stars) {
      deleteRating()
    } else if (rating !== stars) {
      editRating(rating)
    }
  }

  const addRating = async (rating) => {
    const response = await fetch('/api/ratings', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        game_name: gameData.data.name,
        game_id: gameData.data.id,
        rating
      })
    })
    const content = await response.json()

    if (content.status === 'error') return

    setStars(rating)
    console.log(content)
  }

  const deleteRating = async () => {
    const response = await fetch(`/api/ratings?id=${ratingData?.data._id}`, {
      method: 'DELETE'
    })
    const content = await response.json()

    if (content.status === 'error') return

    setStars(null)
    console.log(content)
  }

  const editRating = async (rating) => {
    const response = await fetch(`/api/ratings?id=${ratingData?.data._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        game_name: gameData.data.name,
        game_id: gameData.data.id,
        rating
      })
    })
    const content = await response.json()

    if (content.status === 'error') return

    setStars(rating)
    console.log(content)
  }

  useEffect(() => {
    if (ratingData?.data) {
      setStars(ratingData.data.rating)
    } else {
      setStars(null)
    }
  }, [ratingData])

  return (
    <div>
      {!gameData ? (
        <div className="center">
          <Loading />
        </div>
      ) : (
        <>
          {gameData.data?.background_image && (
            <Image
              src={gameData.data.background_image}
              alt={gameData.data?.name}
              width={1000}
              height={500}
              quality={100}
            />
          )}

          <h1>
            {gameData.data?.name} (
            {gameData.data?.released
              ? gameData.data.released.split('-')[0]
              : 'N/A'}
            )
          </h1>
          {STARS_OPTIONS.map((option) => (
            <button
              className={option === stars && 'active'}
              onClick={() => ratingController(option)}
              key={option}
            >
              {option === stars || stars > option ? (
                <img src="/static/icons/star-solid.png" alt="Star Icon" />
              ) : (
                <img
                  src="/static/icons/star-regular.png"
                  alt="Star Icon"
                  id={`rating-star-${option}`}
                  onMouseEnter={() =>
                    (document.getElementById(`rating-star-${option}`).src =
                      '/static/icons/star-solid.png')
                  }
                  onMouseLeave={(e) =>
                    (e.target.src = '/static/icons/star-regular.png')
                  }
                />
              )}
            </button>
          ))}
          <ul className="genres">
            <strong>Genres:</strong>{' '}
            {gameData.data?.genres.length ? (
              gameData.data.genres.map((genre, index) => (
                <li key={index}>{genre.name}</li>
              ))
            ) : (
              <li>N/A</li>
            )}
          </ul>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: gameData.data?.description }}
          ></div>
        </>
      )}

      <style jsx>{`
        button {
          border: none;
          background-color: transparent;
          cursor: pointer;
        }

        h1 {
          margin-top: 2rem;
        }

        .genres {
          display: flex;
          gap: 0.6rem;
          list-style: none;
          margin-top: 1rem;
        }

        .genres li:not(:last-child):after {
          content: ',';
        }

        .description {
          display: block;
          margin-top: 2rem;
        }

        .description > :global(p + p) {
          margin-top: 2rem;
        }

        .description > :global(br) {
          margin-top: 2rem;
        }
      `}</style>
    </div>
  )
}

export default GameDetails
