const http = require('http')

const PORT = 8333
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT)

// createServer的逻辑 和业务代码无关
