const {createGzip, createDeflate} = require('zlib');

module.exports = (rs, req, res) => {
  const acceptEncoding = req.headers['accept-encoding']; // 接受的压缩类型
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) { // 浏览器不支持压缩 或者 服务器不支持的格式
    return rs;
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    res.setHeader('Content-Encoding','gzip');
    return rs.pipe(createGzip());
  } else if (acceptEncoding.match(/\bdeflate\b/)) {
    res.setHeader('Content-Encoding','deflate');
    return rs.pipe(createDeflate());
  }
}
