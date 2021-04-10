const blogRoutes = require('express').Router()
const Blog = require('../models/Blog.js')
const User = require('../models/User.js')
const verifyToken = require('../utils/middleware/verifyToken')

blogRoutes.get('/', async (_, res) => {
  const request = await Blog.find({}).populate('user_id', {
    name: 1,
    username: 1,
  })
  res.json(request)
})

blogRoutes.post('/', verifyToken, async (req, res) => {
  const { title, author, url, likes = 0 } = req.body
  const user_id = req.user_id
  const user = await User.findOne({ _id: user_id })
  const blog = new Blog({ title, author, url, likes, user_id })
  user ? (user.blogs_id = [...user.blogs_id, blog._id]) : undefined
  await user.save()
  const save = await blog.save()
  res.status(201).json(save)
})

blogRoutes.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  const user_id = req.user_id
  const blog = await Blog.findOne({ _id: id })
  if (blog.user_id.toString() === user_id) {
    const blogUpdate = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    })
    res.status(201).json(blogUpdate)
  } else {
    res
      .status(401)
      .json({ message: "You haven't authorization for edit this blog" })
  }
})

blogRoutes.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  const user_id = req.user_id
  const blog = await Blog.findOne({ _id: id })
  if (user_id === blog.user_id.toString()) {
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } else {
    res
      .status(401)
      .json({ message: "You haven't authorization for delete this blog" })
  }
})

module.exports = blogRoutes
