const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config/defaultConfig.js');
const route = require('./helper/router.js');


const server = http.createServer((req, res) => {
  //  NOTE: 获取用户当前文件夹
  const filePath = path.join(conf.root, req.url);
  route(req, res, filePath);
});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}/`
  console.log(`Server running at: ${chalk.green(addr)}`);
});

//  supervisor src/index.js
