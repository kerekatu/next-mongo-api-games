import GameRating from '@/models/GameRating'
import databaseConnect from '@/lib/db'

databaseConnect()

export default async (req, res) => {
  const { method } = req

  if (method === 'GET') {
    try {
      const ratings = await GameRating.find()

      res.status(200).json(ratings)
    } catch (error) {
      res.status(400).json(error)
    }
  } else if (method === 'POST') {
    try {
      const newRating = await GameRating.create({
        game: {
          name: req.body.game_name,
          id: req.body.game_id
        },
        rating: req.body.rating
      })

      res.status(200).json(newRating)
    } catch (error) {
      res.status(400).json(error)
    }
  }
}
