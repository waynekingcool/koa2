const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// session
const session = require('koa-generic-session')

const koaStatic = require('koa-static')

// redisStroe
const redisStroe = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')
// 密钥
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

// 路由
const profileApiRouter = require('./routes/api/blog-profile')
const blogHomeApiRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const utilsApiRouter = require('./routes/api/utils')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')
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
app.use(koaStatic(__dirname + '/public'))
// app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))
app.use(koaStatic(path.join(__dirname, '../uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SECRET_KEY]
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
app.use(profileApiRouter.routes(), profileApiRouter.allowedMethods())
app.use(blogHomeApiRouter.routes(), blogHomeApiRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
// 404路由注册到最下面
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
