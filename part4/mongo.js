const mongoose = require('mongoose')
const { MONGODB_URI, NODE_ENV, TEST_MONGODB_URI } = require('./utils/config.js')
const { info, error } = require('./utils/loggers.js')
const mongoUrl = NODE_ENV === 'test' ? TEST_MONGODB_URI : MONGODB_URI
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => info('db connected successful'))
  .catch((err) => error(err))
