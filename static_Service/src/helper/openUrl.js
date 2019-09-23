const { exec } = require('child_process');

module.exports = url => {
  console.log("当前执行环境：",process.platform)
  switch (process.platform) {
    case 'darwin':
      exec(`open ${url}`)
      break;
    case 'win32':
      exec(`start ${url}`)
      break;
  }
}
