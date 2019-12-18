const {
	login
} = require('../controller/user')
const {
	SuccessModel,
	ErrorModel
} = require('../model/resModel')

const handleUserRouter = (req, res) => {
	const {
		url,
		method,
		path
	} = req
	if (method === 'POST' && path === '/api/user/login') {
		const {
			username,
			password
		} = req.body
		const result = login(username, password)
		console.log("username", username, password)
		return result.then(data => {
			if (data.username) {
				// 设置 session 
				req.session.username = data.username
				req.session.realname = data.realname
				console.log("session is", req.session)
				return new SuccessModel(data)
			}
			return new ErrorModel('账号或密码错误')
		})
	}

	// 登陆验证测试
	// if (method === 'GET' && path === '/api/user/login-test') {
	// 	console.log("req.session",req.session)
	// 	if (req.session.username) {
	// 		return Promise.resolve(
	// 			new SuccessModel({
	// 				session: req.session
	// 			})
	// 		)
	// 	}
	// 	return Promise.resolve(
	// 		new ErrorModel('尚未登陆')
	// 	)
	// }
}

module.exports = handleUserRouter