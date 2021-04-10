const jwt = require('jsonwebtoken')
const { SING } = require('../../utils/config')

const verifyToken = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = ''
  
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.split(' ')[1]
  }

  const verify = jwt.verify(token, SING)
  if (!token || !verify.id) {
    res.status(401).json({ error: 'token missing or invalid' })
  }
  const { id: user_id } = verify

  req.user_id = user_id
  req.token = token

  next()
}
module.exports = verifyToken
