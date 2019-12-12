var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
	const {
        username,
        password
    } = req.request
    const data = login(username, password)
    if (data.username) {
        // 设置 session 
        ctx.session.username = data.username
        ctx.session.realname = data.realname
		res.json(
			new SuccessModel(data)
		)
        return
	}
	res.json(
		new ErrorModel('账号或密码错误')
	)
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