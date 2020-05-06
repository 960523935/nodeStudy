const s = 'hello world'
const fs = require('fs')
const path = require('path')

function greet(name) {
  console.log(`${s} ${name} !`)
}
/**异步读取文件 */
function readFile() {
  fs.readFile(path.resolve('./file/app.txt'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
    }
  })
}
/** 同步读取文件 */
function readFileSync() {
  try {
    const data = fs.readFileSync(path.resolve('./file/app.txt'), 'utf-8')
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
function readImg() {
  fs.readFile(path.resolve('./img/2.jpg'), (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      // console.log(data.toString('utf-8')) // 不要放开，ide会卡死
    }
  })
}

/**写文件 */
function writeFile() {
  fs.writeFile(path.resolve('./file/outFile.txt'), '1234567890', (err) => {
    console.log(err)
  })
}

function writeImg() {
  fs.readFile(path.resolve('./img/2.jpg'), (err, data) => {
    if (err) {
      console.log(err)
    } else {
      fs.writeFile(path.resolve('./img/beauty.jpg'), data, (err) => {
        console.log(err)
      })
    }
  })
}

/**读取文件的创建时间，大小等信息 */
function getFileInfo() {
  fs.stat('./img/2.jpg', (err, stat) => {
    console.log(err, stat)
  })
}

/**数据流读取 */
function readStream() {
  const res = fs.createReadStream(path.resolve('./file/app.txt'), 'utf-8')
  res.on('data', (chunk) => {
    console.log(Date.now(), '\n', chunk)
  })
  res.on('end', () => {
    console.log('END')
  })
  res.on('error', (err) => {
    console.log(err)
  })
}

/**数据流写入 */
function writeStream() {
  // const wri = fs.createWriteStream(path.resolve('./file/app.txt'), 'utf-8')
  // wri.write('使用stream写入文本数据\n换行了没')
  // wri.end()
  const wri = fs.createWriteStream(path.resolve('./file/app2.txt'))
  wri.write(new Buffer('使用stream写入文本数据\n换行了没', 'utf-8'))
  wri.write(new Buffer('END', 'utf-8'))
  wri.end()
}

function pipes() {
  const rs = fs.createReadStream(path.resolve('./file/app.txt'))
  const ws = fs.createWriteStream(path.resolve('./file/app3.txt'))
  ws.write('\nIS-END')
  rs.pipe(ws, { end: false })
}

module.exports = {
  greet,
  readFile,
  readFileSync,
  readImg,
  writeFile,
  writeImg,
  getFileInfo,
  readStream,
  writeStream,
  pipes,
}
