const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', (err) => {
	console.err("创建失败了 err",err)
})

// 测试
redisClient.set('myname','zhangsan',redis.print)
redisClient.get('myname',(err, val) => {
	if (err) {
		console.error("获取值失败 err", err)
		return 
	}
	console.log("获取成功 val ->>",val)
	//  退出
	redisClient.quit()
})



