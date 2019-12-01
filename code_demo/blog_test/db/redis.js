const redis = require('redis')
const {
	REDIS_CONF
} = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', (err) => {
	console.err("创建失败了 err", err)
})


function set(key, val) {
	if (typeof val === 'object') {
		val = JSON.stringify(val)
	}
	redisClient.set(key, val, redis.print)
}

function get(key, val) {
	const promise = new Promise((resolve, reject) => {
		redisClient.get(key, (err, val) => {
			if (err) {
				reject(err)
				return
			}
			if (val === null) {
				resolve(null)
				return
			}
			try {
				resolve(JSON.parse(val))
			} catch (ex) {
				resolve(val)
			}
			console.log("获取成功 val ->>", val)
		})
	})
	return promise
}



module.exports = {
	get,
	set,
}