const hostname = '127.0.0.1';
const port = 3000;

module.exports = {
  hostname,
  port,
  root: process.cwd(), // 当前工作目录。即命令行的执行时的路径
  compress: /\.(html|js|css|md)/,  // 设置支持的文件后缀
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true,
  }
}
