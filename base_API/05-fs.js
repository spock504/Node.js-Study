const fs = require('fs');

const result = fs.readFile('./01-node.js',(err,res) => {
	if(!err) {
		console.log(res.toString())
	}
})

console.log("resule---",result)