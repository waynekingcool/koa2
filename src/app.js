const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// session
const session = require('koa-generic-session')
// redisStroe
const redisStroe = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')

// 路由
const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/view/error')

const { isProd } = require('./utils/env')

// error handler
let onerrorConf = {}
// 如果是生产环境则跳转到错误页
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = ['King123!']
app.use(session({
  key: 'weibo.sid', //修改cookie默认名称
  prefix: 'weibo:sess:', //redis key 的前缀
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStroe({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// 404路由注册到最下面
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
