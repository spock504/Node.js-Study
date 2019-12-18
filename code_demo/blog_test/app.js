const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const {access} = require('./src/utils/log')

// session 数据
const SESSION_DATA = {}

// 设置cookie过期时间
const getCookieExpireTime = () => {
	const d = new Date()
	const expireTime = 24 * 60 * 60 * 1000
	d.setTime(d.getTime() + expireTime)
	// console.log("expireTime",d.toGMTString())
	return d.toGMTString()
}

// 用于处理post data(POST 数据以流的方式处理)
const getPostData = (req) => {
	const promise = new Promise((resolve, reject) => {
		if (req.method !== 'POST') {
			resolve({})
			return
		}
		if (req.headers['content-type'].indexOf('application/json') === -1) {
			resolve({})
			return
		}
		let postData = ''
		req.on('data', chunk => {
			postData += chunk.toString()
		})
		
		req.on('end', () => {
			// console.log("end postData",postData)
			if (!postData) {
				resolve({})
				return
			}
			resolve(
				JSON.parse(postData)
			)
		})
	})
	return promise
}

const serverHandle = (req, res) => {
	// 记录access log 日志
	access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}}`)
	// 设置返回格式 JSON
	res.setHeader('Content-type', 'application/json');
	//  获取path
	const {
		url
	} = req
	// console.log("req.url",url)
	// 获取path
	req.path = url.split('?')[0]

	// 解析query
	req.query = querystring.parse(url.split('?')[1])

	// 解析 cookie
	req.cookie = {}
	const cookieStr = req.headers.cookie || ''
	console.log("cookieStr", cookieStr)
	cookieStr.split(';').forEach(item => {
		if (!item) return
		const arr = item.split('=')
		const key = arr[0].trim()
		const val = arr[1].trim()
		req.cookie[key] = val
	})

	// 解析 session

	let userId = req.cookie.userid
	console.log("userId",userId)
	let needSetCookie = false
	if (userId) {
		if (!SESSION_DATA[userId]) {
			SESSION_DATA[userId] = {}
		}
	} else {
		needSetCookie = true
		userId = `${Date.now()}_${Math.random()}`
		SESSION_DATA[userId] = {}
	}
	req.session = SESSION_DATA[userId]
	console.log("请求的 session",req.session,needSetCookie)

	// res.setHeader('Access-Control-Allow-Origin', '*') // 设置跨域请求

	// 处理post data
	getPostData(req).then(postData => {
		// console.log("postData", postData)
		req.body = postData  // post的数据

		// 处理blog路由
		const blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			return blogResult.then(blogData => {
				if (needSetCookie) {
					// 操作cookie (httpOnly 只允许服务端进行修改)
					res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpireTime()}`)
				}
				res.end(JSON.stringify(blogData))
				return
			})
		}

		// 处理user路由
		const userResult = handleUserRouter(req, res)
		if (userResult) {
			return userResult.then(userData => {
				if (needSetCookie) {
					res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpireTime()}`)
				}
				res.end(
					JSON.stringify(userData)
				)
				return
			})
		}
		res.writeHead(404, {
			'Content-type': 'text/plain'
		})
		res.write('404 Not Found\n')
		res.end();
	})
}

module.exports = serverHandle

//  procress.env.NODE_ENV
//  系统基本功能的设置

// router管理路由
// controller 处理数据