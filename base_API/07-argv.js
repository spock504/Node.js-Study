const { argv, argv0, execArgv, execPath, env } = process

argv.forEach((item,index) => {
	console.log(`item${index}--`,item)
})

console.log("argv0--",argv0)
console.log("execArgv--",execArgv)
console.log("execPath--",execPath)
console.log("env--",env)
console.log("当前路径pwd--",process.cwd())