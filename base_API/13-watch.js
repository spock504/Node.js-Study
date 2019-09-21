const fs = require('fs');
console.log('会监听文件下的改变: ')
 // 监听文件的变化
fs.watch('./', {
	recursive: true
}, (eventType, filename) => {
	console.log('事件类型',eventType,' 文件名:',filename)
})