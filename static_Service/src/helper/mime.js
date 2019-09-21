const path = require('path');
const mimeTypes = {
  'css': 'text/css',
  'gif': 'image/gif',
  'jpg': 'image/jpg',
  'png': 'image/png',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'txt': 'text/plain',
}

module.exports = (filePath) => {
  let ext = path.extname(filePath)
    .split('.')
    .pop()
    .toLowerCase();  // 取以 . 结尾的最后内容

  if (!ext) {
    ext = filePath
  }
  return mimeTypes[ext] || mimeTypes['txt'];
}
