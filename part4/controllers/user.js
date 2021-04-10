const userRouter = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const verifyToken = require('../utils/middleware/verifyToken')
const { db } = require('../models/User.js')
const Blog = require('../models/Blog.js')

userRouter.get('/', async (_, res) => {
  const users = await User.find({}).populate('blogs_id', {
    title: 1,
    author: 1,
    url: 1,
  })
  res.status(200).json(users)
})

userRouter.post('/', async (req, res) => {
  let { username = '', password = '', name = '' } = req.body
  if (password.length > 3 && username.length > 3) {
    password = await bcrypt.hash(password, 10)
    const newUser = new User({ password, name, username })
    const dbRequest = await newUser.save()
    res.status(201).json(dbRequest)
  } else {
    res.status(400).json({
      message:
        username.length < 3
          ? 'usernama it too short, minimum 3 characters'
          : 'password it too short, minimum 3 characters',
    })
  }
})

userRouter.delete('/', verifyToken, async (req, res) => {
  const { username = '', password = '' } = req.body
  const user_id = req.user_id
  const user = await User.findOne({ _id: user_id })
  const correct_password = user
    ? await bcrypt.compare(password, user.password)
    : false
  if (correct_password && username === user.username) {
    await User.findByIdAndDelete(user_id)
    await Blog.deleteMany({ user_id: user_id })
    res.status(204).end()
  } else {
    res
      .status(401)
      .send({ message: "You haven't authorization for edit this Usuario" })
  }
})

module.exports = userRouter
