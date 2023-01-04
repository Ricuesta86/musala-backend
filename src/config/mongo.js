const mongoose = require('mongoose')

const dbConnect = () => {
  const { URL_DB, URL_DB_TEST, NODE_ENV } = process.env

  const connectionString = NODE_ENV === 'test' ? URL_DB_TEST : URL_DB

  mongoose.set('strictQuery', false)

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, res) => {
    if (err) throw err
    console.log('Database Online')
  })
}

module.exports = dbConnect
