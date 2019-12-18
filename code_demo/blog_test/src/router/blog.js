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

// 登陆验证 中间件
const loginCheck = (req) => {
	if (!req.session.username) {
		return Promise.resolve(
			new ErrorModel('尚未登陆')
		)
	}
}

const handleBlogRouter = (req, res) => {
	const {
		method,
		path,
		query
	} = req
	const {
		id
	} = query
	// 获取博客列表
	if (method === 'GET' && path === '/api/blog/list') {
		const {
			author = '', keyword = ''
		} = query
		const result = getList(author, keyword)
		return result.then(listData => {
			return new SuccessModel(listData)
		})
	}

	// 获取博客详情
	if (method === 'GET' && path === '/api/blog/detail') {
		const result = getDetail(id)
		return result.then(data => {
			return new SuccessModel(data)
		})
	}

	// 新建一篇博客
	if (method === 'POST' && path === '/api/blog/new') {
		const loginCheckResult = loginCheck(req)
		if (loginCheckResult) {
			// 未登录
			return loginCheckResult
		}

		req.body.author = req.session.username
		const result = newBlog(req.body)
		return result.then(data => {
			return new SuccessModel(data)
		})
	}

	// 更新一篇博客
	if (method === 'POST' && path === '/api/blog/update') {
		const loginCheckResult = loginCheck(req)
		if (loginCheckResult) {
			// 未登录
			return loginCheckResult
		}
		const result = updateBlog(req.body)
		return result.then(val => {
			if (val) {
				return new SuccessModel()
			} else {
				return new ErrorModel('更新博客失败')
			}
		})
	}

	// 删除一篇博客
	if (method === 'POST' && path === '/api/blog/delete') {
		const loginCheckResult = loginCheck(req)
		if (loginCheckResult) {
			// 未登录
			return loginCheckResult
		}
		const author = req.session.username
		const result = deleteBlog(req.body.id, author)
		return result.then(val => {
			if (val) {
				return new SuccessModel()
			} else {
				return new ErrorModel('删除博客失败')
			}
		})

	}

}

module.exports = handleBlogRouter