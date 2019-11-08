//  stream: 有方向的数据
const fs = require('fs');
const rs = fs.createReadStream('./14-stream.js');
rs.pipe(process.stdout);  // 比readfile 实现的更加优雅

//  创建可写流
const ws = fs.createWriteStream('./text.txt');
const tid = setInterval(() => {
	const num = parseInt(Math.random() * 10)
	console.log('num:',num)
	if (num < 8) {
		ws.write(num + '')  // 需要接受字符串或者buffer , 会清空重写
	} else {
		clearInterval(tid)
		ws.end()
	}
}, 200);
ws.on('finish',() => {
	console.log('done !')
});
