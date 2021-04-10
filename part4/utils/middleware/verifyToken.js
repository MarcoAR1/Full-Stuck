const jwt = require('jsonwebtoken')
const { SING } = require('../../utils/config')

const verifyToken = (req, res, next) => {
  const authorization = req.get('authorization')
  console.log('aqui toy')
  let token = ''

  if (authorization && authorization.toLowerCase().startWith('bearer')) {
    token = authorization.split(' ')[1]
  }

  const verify = jwt.verify(token, SING)

  if (!token || verify.id) {
    res.status(401).json({ error: 'token missing or invalid' })
  }

  const { id: user_id } = verify

  req.user_id = user_id

  next()
}
module.exports = verifyToken
