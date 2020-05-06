process.env.NODE_ENV = 'test'

const model = require('./model')

model.sync()
