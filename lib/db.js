const mongoose = require('mongoose')

const { MONGODB_URI } = process.env

module.exports = function () {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}
