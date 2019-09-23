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
