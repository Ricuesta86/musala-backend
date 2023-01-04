const express = require('express')
const app = express()
const cors = require('cors')

const router = require('./routers')
const dbConnect = require('./config/mongo')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

dbConnect()

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
