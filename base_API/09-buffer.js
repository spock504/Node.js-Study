console.log(Buffer.alloc(10))
console.log(Buffer.alloc(5,1))
console.log(Buffer.from('test','base64')) // 指定编码方式

console.log(Buffer.byteLength('test')) // 一个英文一个字节
console.log(Buffer.byteLength('测试')) // 一个中文3个字节

const buf1 = Buffer.from('this');
const buf2 = Buffer.from(' is');
const buf3 = Buffer.from(' test !');
const buf = Buffer.concat([buf1, buf2, buf3])
console.log('buf--',buf.toString()). // buffer 的拼接
