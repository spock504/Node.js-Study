//  根据key值来更新响应
const { cache } = require('../config/defaultConfig');

function refreshRes (stats, res) {
  const {maxAge, expires, cacheControl, lastModified, etag} = cache;
  if (expires) {
    res.setHeader('expires',new Date(Date.now()+ maxAge * 1000 ).toUTCString())
  }
  if (cacheControl) {
    res.setHeader('Catch-Control',`public, max-age=${maxAge}`) // 公共资源 最大过期时间
  }
  if (lastModified) {
    res.setHeader('Last-Modified', stats.mtime.toUTCString()) // mtime 修改时间
  }
  if (etag) {
    res.setHeader('ETag', `${stats.size}-${stats.mtime}`)
  }
}

module.exports = (stats, req, res) => {
  refreshRes(stats, res);
  const lastModified = req.headers['if-modified-since'];
  const etag = req.headers['if-none-match'];
  if (!lastModified && !etag) { // 第一次请求，没有缓存
    return false
  }
  if (lastModified && lastModified !== res.getHeader('Last-Modified')) { // 有Last-Modified 但是不相等
    return false
  }
  if (etag && etag !== res.getHeader('ETag')) { // 有ETag 但是不相等
    return false
  }
  return true
}
