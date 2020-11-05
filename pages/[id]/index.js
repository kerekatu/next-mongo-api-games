import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const Game = () => {
  const [stars, setStars] = useState(null)
  const router = useRouter()
  const { data, error } = useSWR(
    `http://localhost:3000/api/games/${router.query.id}`
  )

  if (!data) return <div>Loading...</div>

  console.log(data)

  return (
    <div>
      <div>{data.data.name}</div>
      <button onClick={() => setStars(1)}>1</button>
      <button onClick={() => setStars(2)}>2</button>
      <button onClick={() => setStars(3)}>3</button>
      <button onClick={() => setStars(4)}>4</button>
      <button onClick={() => setStars(5)}>5</button>
      <style jsx>{``}</style>
    </div>
  )
}

export default Game
