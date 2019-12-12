//  中间件原理分析
const http = require('http')

// 组合中间件
function compose(middlewareList) {
    return function(ctx) {
        //  中间件调用的逻辑
        function dispatch(i) {
            const fn = middlewareList[i]
            //  防止使用非async函数， 整体应都返回promise对象
            try {
                return Promise.resolve(
                    fn(ctx, dispatch.bind(null, i + 1)) // 取下一个中间件
                )
            } catch (error) {
                return Promise.reject(error)
            }
        }
        return dispatch(0)
    }
}

class LikeKoa2 {
    constructor() {
        this.middlewareList = []
    }

    use(fn) {
        this.middlewareList.push(fn)
        return this // 方便链式调用
    }

    createContext(req, res) {
        const ctx = {
            req, 
            res
        }
        ctx.query = req.query
        return ctx
    }

    callback () {
        const fn = compose(this.middlewareList)
        return (req, res) => {
            const ctx = this.createContext(req, res)
            return fn(ctx)
        }
    }

    listen(...arg) {
        const server = http.createServer(this.callback())
        server.listen(...arg)
    }
}

module.exports = LikeKoa2