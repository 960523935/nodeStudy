const fs = require('fs')
const db = require('./db')

const files = fs.readdirSync(__dirname + '/models')

const js_files = files.filter((f) => {
  return f.endsWith('.js')
}, files)

for (let f of js_files) {
  console.log(`import model from file ${f}...`)
  let name = f.substring(0, f.length - 3)
  module.exports[name] = require(__dirname + '/models/' + f)
}

module.exports.sync = () => {
  db.sync()
}
