const { error } = require('./loggers')
const handleError = (err, req, res, next) => {
  error(err)
  if (req) {
    res.status(404).send(err)
  }
  next(err)
}
module.exports = {
  handleError,
}
