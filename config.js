const defaultConfig = './config-default.js'
// 可设定为绝对路径，如 /opt/product/config-override.js
const overrideConfig = './config-override.js'
const testConfig = './config-test.js'
const fs = require('fs')
let config = null
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'test') {
  console.log(`load ${testConfig}...`)
  config = require(defaultConfig)
  config = Object.assign(config, require(testConfig))
} else {
  console.log(`load ${defaultConfig}...`)
  config = require(defaultConfig)
  try {
    if (fs.statSync(overrideConfig).isFile()) {
      console.log(`load ${overrideConfig}...`)
      config = Object.assign(config, require(overrideConfig))
    }
  } catch (err) {
    console.log(`Cannot load ${overrideConfig}.`)
  }
}
module.exports = config
