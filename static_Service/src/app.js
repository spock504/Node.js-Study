const yargs = require('yargs');
const Server = require('./index');

const argv = yargs
  .usage('anywhere [options]')
  .option('p', {
    alias: 'port',
    descript: '端口号',
    default: 2333
  })
  .option('h',{
    alias: 'hostname',
    descript: 'host',
    default: '127.0.0.1'
  })
  .option('d',{
    alias: 'root',
    descript: 'root path',
    default: process.cwd()
  })
  .version()
  .alias('v', 'version')
  .help()
  .argv;

const server = new Server(argv);
server.start();


//  加上执行权限： chmod +x static_Service/bin/any-document
//  查看： ls -al static_Service/bin/any-document
//  调用： static_Service/bin/any-document -p 9999

// 安装：npm install -g nrm
// 查看npm源：nrm ls
// 切换源：nrm use [name]　


 // pagckage.json中配置bin
 // 登陆npm: npm login
 // 发布npm: npm publish
