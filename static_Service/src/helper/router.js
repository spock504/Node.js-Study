const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const mime = require('./mime.js');
const compress = require('./compress');
const range = require('./range');
const isFresh = require('./cache');


const tplPath = path.join(__dirname, '../template/dir.tpl'); //  处理路径最好用绝对路径
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString()); // source 是Buffer对象

module.exports = async function (req, res, filePath, conf) {
  try {
  //  是文件夹 返回目录，是文件返回内容
    const stats = await stat(filePath);
    if (stats.isFile()) { // 文件
      const contentType = mime(filePath); // 不同后缀实行不同的编译模式
      res.setHeader('Content-Type', contentType);
      //  有缓存并检查缓存是否失效
      if (isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end()
        return
      }
      let rs;
      const { code, start, end } = range(stats.size, req, res);
      if (code === 200) {
      // 无法处理的范围
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, {start, end} );
      }

      if (filePath.match(conf.compress)) { // 符合条件的进行压缩
        rs = compress(rs, req, res);
      }
      rs.pipe(res); //  把文件的内容返回
    } else if (stats.isDirectory()) { // 文件夹
      const files = await readdir(filePath);
      res.statusCode = 200 ;
      res.setHeader('Content-Type', 'text/html');
      const dir = path.relative(conf.root, filePath); // 一个文件相对于另一个文件的路径
      const data = {
        files,
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
      }
      res.end(template(data));
    }
  } catch (ex) {
      console.log('---- 报错了', ex);
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`${ex.toString()} is not a directory or file`);
  }
}
