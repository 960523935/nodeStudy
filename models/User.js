const db = require('../db')

module.exports = db.defineModel('user', {
  name: db.STRING(50),
  age: db.INTEGER,
  email: { type: db.STRING(20), unique: true },
  salary: db.INTEGER,
})
