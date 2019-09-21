const fs = require('fs');
const promisify = require('util').promisify;

const read = promisify(fs.readFile);

// NOTE:  promise

// read('./15-promisify.js').then((data) => {
// 	console.log('read成功: ', data.toString())
// }).catch((err) => {
// 	console.log('read失败: ',err)
// })

// NOTE: async await 
async function test () {
	try {
		const content = await read('./15-promisify.js');
		console.log('async read成功: ',content.toString())
	} catch (err) {
		console.log('async read失败: ',err)
	}
}
test();