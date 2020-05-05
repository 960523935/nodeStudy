const { router } = require('./router')
const { middleware } = require('./middleware')
const bodyParser = require('koa-bodyparser')
const Koa = require('koa')
const app = new Koa()

// 添加解析request的body的中间件，注意要在添加router之前添加此中间件
app.use(bodyParser())

// 添加中间件
app.use(middleware)

// 添加路由
app.use(router.routes())

app.listen(3000)

console.log('server is running at http://localhost:3000')
