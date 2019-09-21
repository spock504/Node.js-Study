const fs = require('fs');
//  读文件
fs.stat('./01-node.js',(err, stats) => {
	if (err) {
		console.log('文件不存在');
		return 
	}

	console.log(stats.isFile());  // 判断是文件
	console.log(stats.isDirectory()); // 判断是文件夹
	console.log("stats-->", stats)
})


//  fs.rename  修改文件名
//  fs.unlink  删除文件
//  fs.mkdir   创建文件夹
//  fs.rmdir   删除文件夹
//  fs.readdir 获取目录下文件夹的内容