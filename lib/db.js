const mongoose = require('mongoose')

const { MONGODB_URI } = process.env

const databaseConnect = async () => {
  return await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

export default databaseConnect
