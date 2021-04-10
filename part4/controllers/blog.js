const blogRoutes = require('express').Router()
const Blog = require('../models/Blog.js')

blogRoutes.get('/', async (_, res) => {
  const request = await Blog.find({}).populate('user_id', {
    name: 1,
    username: 1,
  })
  res.json(request)
})

blogRoutes.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = new Blog({ title, author, url, likes: likes || 0 })

  const save = await blog.save()
  res.status(201).json(save)
})

blogRoutes.put('/:id', async (req, res) => {
  const { id } = req.params
  const dbRequest = await Blog.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  })
  res.status(201).json(dbRequest)
})

blogRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params
  await Blog.findByIdAndDelete(id)
  res.status(204).end()
})

module.exports = blogRoutes
