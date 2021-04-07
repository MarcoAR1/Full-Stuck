const express = require('express')
const blogRoutes = require('./controllers/blog')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const { handleError } = require('./utils/middleware')

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

//Middleware Error
app.use(handleError)

module.exports = app
