import GameRating from '@/models/GameRating'
import databaseConnect from '@/lib/db'

export default async (req, res) => {
  const { method, query } = req

  databaseConnect()

  if (method === 'GET' && query.id) {
    try {
      const rating = await GameRating.findOne({ game_id: query.id })

      res.status(200).json({ status: 'success', data: rating })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error })
    }
  } else if (method === 'GET') {
    try {
      const ratings = await GameRating.find().sort({ _id: 'desc' })

      res.status(200).json({ status: 'success', data: ratings })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error })
    }
  } else if (method === 'POST') {
    try {
      const newRating = await GameRating.create({
        game_id: req.body.game_id,
        game_name: req.body.game_name,
        rating: req.body.rating
      })

      res.status(200).json(newRating)
    } catch (error) {
      res.status(400).json({ status: 'error', message: error })
    }
  } else if (method === 'PUT') {
    try {
      const rating = await GameRating.findByIdAndUpdate(query.id, req.body, {
        new: true,
        runValidators: true
      })

      if (!rating) {
        return res.status(400).json({ status: 'error' })
      }

      res.status(200).json({ status: 'success', data: rating })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error })
    }
  } else if (method === 'DELETE') {
    try {
      const deletedRating = await GameRating.deleteOne({ _id: query.id })

      if (!deletedRating) {
        return res.status(400).json({ status: 'error' })
      }

      res.status(200).json({ success: 'success', data: {} })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error })
    }
  }
}
