const http = require('http')

const server = http.createServer((req, res) => {
    //  模拟报错
    if (req.url === '/err') {
        throw new Error('/err 报错了')
    }

    res.setHeader('Content-type', 'application/json')
    res.end(
        JSON.stringify({
            error: 0,
            msg:'pm2 test server 1'
        })
    )
})
server.listen(8000)
console.log("server is listen http://localhost:8000")