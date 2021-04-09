const { error } = require('./loggers')
const ERROR_TYPE = {
  ValidationError: (err, res) => res.status(400).send(err),
  default: (err, next) => next(err),
}

const handleError = (err, req, res, next) => {
  error(err)
  error(err.name)
  ERROR_TYPE[err.name]
    ? ERROR_TYPE[err.name](err, res)
    : ERROR_TYPE['default'](err, next)
}
module.exports = {
  handleError,
}
