const fs = require('fs')
const path = require('path')

//  兼容不同电脑
const fileName = path.resolve(__dirname, 'text_test.txt')

// 读取文件内容
fs.readFile(fileName, (err, data) => {
	if (err) {
		console.error("err", err)
		return
	}
	//  data 是二进制 需要转化为字符串
	console.log("data 文件内容")
	console.log(data.toString())
})


// 写入文件
// const content = '这是新写入的内容\n'
// const opt = {
// 	flag: 'a' // 追加写入，覆盖用w
// }
// fs.writeFile(fileName, content, opt, err => {
// 	if (err) {
// 		console.error("err", err)
// 		return
// 	}
// })

// 判断文件是否存在
fs.exists(fileName,(exist) => {
	console.log("exist",exist)
})