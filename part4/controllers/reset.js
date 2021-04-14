const resetTestRoutes = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

resetTestRoutes.post('/', async (_, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  res.status(204).end()
})

module.exports = resetTestRoutes
