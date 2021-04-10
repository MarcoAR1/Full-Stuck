const jwt = require('jsonwebtoken')
const { SING } = require('../utils/config.js')
const User = require('../models/User')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res) => {
  const { username = '', password = '' } = req.body
  const user = await User.findOne({ username })
  const validation = user
    ? await bcrypt.compare(password, user.password)
    : false

  if (validation) {
    const tokenUser = {
      id: user._id,
      username,
    }
    const token = jwt.sign(tokenUser, SING, { expiresIn: 60 * 60 * 24 * 15 })

    return res.status(202).send({
      username,
      name: user.name,
      token,
    })
  } else {
    res.status(401).json({ message: 'pasword or username incorrect.' })
  }
})

module.exports = loginRouter
