//  fs（文件系统）回调函数的第一个参数会保留给异常，如果成功，则第一个参数为null或undefined

const fs = require('fs');
//  读文件
fs.readFile('./01-node.js','utf8',(err,data) => {
	if (err) throw err
	console.log("data-->",data)
})
//  写文件: 会创建一个text的文件，然后将content的内容写进去
const content = Buffer.from('this is a test!')
fs.writeFile('./text',content,(err) => {
	if (err) throw err;
	console.log('done !')
})