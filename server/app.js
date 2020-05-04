const fs = require('fs')
const http = require('http')
const url = require('url')
const path = require('path')
const workDir = path.resolve(__dirname, './')
const root = path.resolve('./' + process.argv[2] || '.')
console.log(root)
console.log(
  url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash')
)

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  const filepath = path.join(root, pathname)
  console.log('filepath', filepath)
  fs.stat(filepath, (err, stats) => {
    if (!err && stats.isFile()) {
      console.log('200 ' + req.url)
      res.writeHead(200)
      fs.createReadStream(filepath, 'utf-8').pipe(res)
    } else {
      console.log('404' + req.url)
      res.writeHead(404)
      res.end('404 Not Found!')
    }
  })
})
server.listen(8080)
console.log('server is running at http://localhost:8080/')
