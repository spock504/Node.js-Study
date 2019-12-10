var express = require('express');
var router = express.Router();
const {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	deleteBlog
} = require('../controller/blog')
const {
	SuccessModel,
	ErrorModel
} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {
	let {
		author = '', keyword = ''
	} = req.query

	// 管理员界面
	if (req.query.isAdmin) {
		if (!req.session.username) {
			// 未登陆
			res.json(
				new ErrorModel('未登陆')
			)
			return
		}
		// 强制查询自己的博客
		author = req.session.username
	}
	const result = getList(author, keyword)
	return result.then(listData => {
		res.json(
			new SuccessModel(listData)
		)
	})
});

router.get('/detail', (req, res, next) => {
	const {
		id
	} = req.query
	const result = getDetail(id)
	return result.then(data => {
		res.json(
			new SuccessModel(data)
		)
	})
});

//  执行中间件校验
router.post('/new', loginCheck, (req, res, next) => {
	req.body.author = req.session.username
	const result = newBlog(req.body)
	return result.then(data => {
		res.json(
			new SuccessModel(data)
		)
	})
})

router.post('/new', loginCheck, (req, res, next) => {
	const {
		id
	} = req.query
	const result = updateBlog(id, req.body)
	return result.then(val => {
		if (val) {
			res.json(
				new SuccessModel()
			)
		} else {
			res.json(
				new ErrorModel('更新博客失败')
			)
		}
	})
})

router.post('/delete', loginCheck, (req, res, next) => {
	const {
		id
	} = req.query
	const author = req.session.username
	const result = deleteBlog(id, author)
	return result.then(val => {
		if (val) {
			res.json(
				new SuccessModel()
			)
		} else {
			res.json(
				new ErrorModel('删除博客失败')
			)
		}
	})
})




module.exports = router;
