const userRouter = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

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

module.exports = userRouter
