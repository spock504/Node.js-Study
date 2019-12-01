const fs = require('fs')
const path = require('path')

// 写日志
function writeLog(writeStream, log) {
	writeStream.write(log + '\n') // 写日志
}

// 生成write stream
function createWriteStream(fileName) {
	const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
	const writeStream = fs.createWriteStream(fullFileName, {
		flags: 'a'
	})
	return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')

function access(log) {
	writeLog(accessWriteStream, log)
}

// 写错误日志
const errorWriteStream = createWriteStream('error.log')

function error(log) {
	writeLog(errorWriteStream, log)
}

// 写成功日志
const successWriteStream = createWriteStream('error.log')

function event(log) {
	writeLog(successWriteStream, log)
}

module.exports = {
	access,
	error,
	event,
}