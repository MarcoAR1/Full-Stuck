const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config.js')
const { info, error } = require('./utils/loggers.js')
const mongoUrl = MONGODB_URI
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => info('db connected successful'))
  .catch((err) => error(err))
