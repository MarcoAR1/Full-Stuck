const { error } = require('../loggers')
const ERROR_TYPE = {
  default: (res, err, next) => res.status(500).send(err),
  ValidationError: (res, err) => res.status(400).send(err),
  JsonWebTokenError: (res) =>
    res.status(401).json({ error: 'token missing or invalid' }),
  TokenExpiredError: (res) => res.status(401).json({ error: 'token expired' }),
}

const handleError = (err, req, res, next) => {
  error(err)
  error(err.name)
  ERROR_TYPE[err.name]
    ? ERROR_TYPE[err.name](res, err)
    : ERROR_TYPE.default(res, err, next)
}
module.exports = {
  handleError,
}
