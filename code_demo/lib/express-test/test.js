//  测试自定义的express 
const express = require('./express_test')

// http请求实例
const app = express()

app.use((req, res, next) => {
    console.log("请求开始...",req.url, req.method)
    next()
})

app.use((req, res, next) => {
    // 假设在处理cookie
    console.log("处理 cookie")
    req.cookie = {
        userId: 'user233'
    }
    next()
})


app.use('/api',(req, res, next) => {
    console.log("处理/api路由")
    next()
})

function loginCheck (req, res, next) {
    setTimeout(() => {
        console.log("模拟登陆成功")
        next()
    })
}

app.get('/api/get-cookie',loginCheck, (req, res , next) => {
    console.log('get /api/get-cookie')
    res.json({
        error: 0,
        data:req.cookie
    })
    next()
})

app.listen(8233, () => {
    console.log("监听 8233")
})
