const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')

const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')

const {REDIS_CONF} = require('./conf/db')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // app.use(morgan('dev')); // 测试环境logger就有了
} else {
  //  线上环境输出日志
  const fileName = path.join(__dirname, 'logs','access.log')
  const writeStream = fs.createWriteStream(fileName,{
    flags: 'a',
  })
  app.use(morgan('combined', {
    stream: writeStream
  }));
}

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//  注册路由之前写session相关信息 session 配置
app.keys = ['Liujian._4339#']
app.use(session({
  //  配置cookie
  cookie: {
    path: '/', // 默认配置
    httpOnly: true, // 默认配置
    maxAge: 60 * 60 * 24 * 1000,
  },
  // 配置 redis
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`, // 本地redis
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
