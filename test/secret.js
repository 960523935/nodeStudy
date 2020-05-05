const crypto = require('crypto')

const hash = crypto.createHash('sha1')

hash.update('Hello World!')
hash.update('hello nodejs!')
console.log(hash.digest('hex'))
