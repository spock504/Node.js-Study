const router = require('koa-router')()
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    let {
        author = '', keyword = ''
    } = ctx.query
    // 管理员界面
    if (ctx.query.isAdmin) {
        if (!ctx.session.username) {
            // 未登陆
            ctx.body = new ErrorModel('未登陆')
            return
        }
        // 强制查询自己的博客
        author = ctx.session.username
    }
    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData)
})


router.get('/detail', async (ctx, next) => {
    const {
        id
    } = ctx.query
    const data = await getDetail(id)
    ctx.body = new SuccessModel(data)
});

//  执行中间件校验
router.post('/new', loginCheck, async (ctx, next) => {
    const body = ctx.request.body
    body.author = ctx.session.username
    const data = await newBlog(body)
    ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async (ctx, next) => {
    const {
        id
    } = ctx.request.body
    const val = await updateBlog(id, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('更新博客失败')
    }
})

router.post('/delete', loginCheck, async (ctx, next) => {
    const {
        id
    } = ctx.request.body
    const author = ctx.session.username
    const val = await deleteBlog(id, author)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('删除博客失败')
    }
})


module.exports = router
