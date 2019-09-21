console.log("nextTick  > setTimeout > setImmediate")

setImmediate(() => {
	console.log("setImmediate: 下一个队列中执行")
})

setTimeout(() => {
	console.log("setTimeout")
}, 0)

process.nextTick(() => {
	console.log("nextTick：当前队列的最后执行")
	process.nextTick(() => {
		console.log("nextTick 中的执行")
	})
})