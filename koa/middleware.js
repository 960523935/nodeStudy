const compose = require('koa-compose')

/**异常捕获中间件 */
const handler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
      message: err.message,
    }
  }
}

const writeLogTime = async (ctx, next) => {
  console.log(1)
  await next() // 调用next，先执行下一个中间件处理方法，下一个执行完后，再回头执行本中间件next下面处理方法
  console.log(5)
  const rt = ctx.response.get('ResponseTime')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
}

const setLogTime = async (ctx, next) => {
  console.log(2)
  const start = Date.now()
  await next()
  console.log(4)
  const ms = Date.now() - start
  ctx.set('ResponseTime', `${ms}ms`)
}

exports.middleware = compose([handler, writeLogTime, setLogTime]) //在数组中的顺序很重要,会影响中间件的执行顺序
