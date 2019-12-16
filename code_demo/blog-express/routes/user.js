var express = require('express');
var router = express.Router();
const {
	SuccessModel,
	ErrorModel
} = require('../model/resModel')
const {
	login
} = require('../controller/user')

router.post('/login', function(req, res, next) {
	// console.log(req)
	const {
        username,
        password
	} = req.body
	const result = login(username, password)
	return result.then(data => {
		if (data.username) {
			// 设置 session 
			req.session.username = data.username
			req.session.realname = data.realname
			res.json(
				new SuccessModel(data)
			)
			return
		}
		res.json(
			new ErrorModel('账号或密码错误')
		)
	})
});

router.get('/session-test', (req, res, next) => {
	const session = req.session
	if (session.viewNum === null) {
		session.viewNum = 0
	}
	session.viewNum ++
	res.json({
		viewNum: session.viewNum
	})
});

module.exports = router;