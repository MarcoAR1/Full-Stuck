require('dotenv').config()
require('./mongo')
const { info } = require('./utils/loggers')
const app = require('./app.js')
const { PORT } = require('./utils/config')

app.set('port', PORT)
const Server = app.listen(app.get('port'), () => {
  info(`Server running on port ${app.get('port')}`)
})

module.exports = { app, Server }
