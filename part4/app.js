const express = require('express')
require('express-async-errors')
const blogRoutes = require('./controllers/blog')
const userRouter = require('./controllers/user')
const cors = require('cors')
const morgan = require('morgan')
const { handleError } = require('./utils/middleware/handleError')
const loginRouter = require('./controllers/login')
const { NODE_ENV } = require('./utils/config')

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
if (NODE_ENV === 'test') {
  const resetTestRoutes = require('./controllers/reset')
  app.use('/api/testing/reset', resetTestRoutes)
}
app.use('/api/blogs', blogRoutes)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

//Middleware Error
app.use(handleError)

module.exports = app
