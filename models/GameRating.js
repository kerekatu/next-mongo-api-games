const mongoose = require('mongoose')

const GameRatingSchema = {
  game: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }
}

module.exports =
  mongoose.models.GameRating || mongoose.model('GameRating', GameRatingSchema)
