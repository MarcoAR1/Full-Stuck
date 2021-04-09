require('dotenv').config()
require('./mongo')
const { info } = require('./utils/loggers')
const app = require('./app.js')
const { PORT, PORT_TEST, NODE_ENV } = require('./utils/config')

app.set('port', NODE_ENV === 'test' ? PORT_TEST : PORT)

const Server = app.listen(app.get('port'), () => {
  info(`Server running on port ${app.get('port')}`)
})

module.exports = { app, Server }
