const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config/defaultConfig');
const route = require('./helper/router');
const openUrl = require('./helper/openUrl')

class Server {
  constructor(config) {
    this.conf = {...conf, ...config}
  }
  start () {
    const server = http.createServer((req, res) => {
      //  NOTE: 获取用户当前文件夹
      const filePath = path.join(this.conf.root, req.url);
      route(req, res, filePath, this.conf);
    });

    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}/`
      console.log(`Server running at: ${chalk.green(addr)}`);
      openUrl(addr);
    });
  }
}
module.exports = Server;

//  supervisor src/index.js
