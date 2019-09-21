const EventEmitter = require('events')

class CustomEvent extends EventEmitter {}
const ce = new CustomEvent();

function fn1 (time) {
	console.log('fn1: It is test event!')
	console.log('事件接收的参数',time)
}

function fn2 () {
	console.log('fn2')
}

//  事件绑定,事件名为 test
ce.on('test', fn1)
ce.on('test', fn2);

//  500 ms 触发事件
setInterval(() => {
	ce.emit('test',Date.now()); // 第一个参数为事件名，后面为事件的参数
}, 500)
// 1500 ms 移除事件fn1
setTimeout(() => {
	ce.removeListener('test',fn1)
}, 1500)
