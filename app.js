require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authRouter = require('./route/auth')
const jobRouter = require('./route/jobs')
const authenticateUser = require('./middleware/authentication')
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`The server is listening on port ${PORT}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
