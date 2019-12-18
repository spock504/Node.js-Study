const http = require('http')

const PORT = 8222
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT)
console.log(`监听端口：${PORT}`)

// createServer的逻辑 和业务代码无关
