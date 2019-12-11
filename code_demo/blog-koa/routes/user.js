const router = require('koa-router')()
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const {
	login
} = require('../controller/user')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const {
        username,
        password
    } = ctx.request.body
    console.log("ctx.query",ctx.request.body)
    const data = await login(username, password)
    if (data.username) {
        // 设置 session 
        ctx.session.username = data.username
        ctx.session.realname = data.realname
        console.log("session is", ctx.session)
        ctx.body = new SuccessModel(data)
        return
    }
    ctx.body = new ErrorModel('账号或密码错误')
})

router.get('/session-test', async function (ctx, next) {
    if (ctx.session.viewCount == null) {
        ctx.session.viewCount = 0
    }
    ctx.session.viewCount ++
    ctx.body = {
        error: 0,
        viewCount:ctx.session.viewCount,
    }
})


module.exports = router
