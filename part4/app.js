const express = require('express')
require('express-async-errors')
const blogRoutes = require('./controllers/blog')
const userRouter = require('./controllers/user')
const cors = require('cors')
const morgan = require('morgan')
const { handleError } = require('./utils/middleware')

//Settings
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :json')
)
morgan.token('json', (req) => {
  return JSON.stringify(req.body)
})

//Routes
app.use('/api/blogs', blogRoutes)
app.use('/api/user', userRouter)

//Middleware Error
app.use(handleError)

module.exports = app
