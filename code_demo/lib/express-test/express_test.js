// express 中间件原理
const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
    constructor() {
        // 存放中间件的列表
        this.routes = {
            all: [],
            get: [],
            post: []
        }
    }

    register(path) {
        // 注册中间件的方法: 判断第一个参数是不是路由（字符串）,
        const info = {}
        if (typeof path === 'string') {
            info.path = path
            // 从第二个参数开始转化成数组
            info.stack = slice.call(arguments, 1)
            //另一种写法 :  
            // info.stack = [...arguments].slice(1) 
        } else {
            info.path = '/'
            info.stack = [...arguments]
        }
        return info
    }

    use() {
        //  将所有参数 都传入register
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }

    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
    }

    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }

    // 获取匹配的url
    match(method, url) {
        let stack = []
        if (url === '/favicon.ico') {
            return stack
        }
        let curResult = []
        curResult = curResult.concat(this.routes.all)
        curResult = curResult.concat(this.routes[method])
        curResult.forEach(item => {
            if (url.indexOf(item.path) === 0) {
                // url = '/api/get-cookie 且 item.path === '/'
                //                        且 item.path === '/api'
                //                        且 item.path === '/api/get-cookie'
                stack = stack.concat(item.stack)
            }
        })
        return stack
    }

    //   核心 next 的机制
    handle(req, res, stack) {
        const next = () => {
            //  获取第一个匹配的中间件
            const middleware = stack.shift()
            if (middleware) {
                // 执行中间件函数
                middleware(req, res, next)
            }
        }
        next()
    }

    callback () {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url
            const method = req.method.toLowerCase()
            const resultList = this.match(method, url)
            this.handle(req, res, resultList)
        }
    }

    listen(...args) {
        // 创建http服务 并监听
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

// 工厂函数
module.exports = () => {
    return new LikeExpress()
}