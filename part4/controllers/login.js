const jwt = require('jsonwebtoken')
const { SING } = require('../utils/config.js')
const User = require('../models/User')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res) => {
  const { username = '', password = '' } = req.body
  const data = await User.findOne({ username })
  const validation = data
    ? await bcrypt.compare(password, data.password)
    : false

  if (validation) {
    const tokenUser = {
      id: data._id,
      username,
    }
    const token = jwt.sign(tokenUser, SING, { expiresIn: 60 * 60 * 24 * 15 })

    return res.status(202).send({
      username,
      name: data.name,
      token,
    })
  } else {
    res.status(401).json({ message: 'pasword or username incorrect.' })
  }
})

module.exports = loginRouter
