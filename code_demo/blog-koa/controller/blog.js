const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = async (author, keyword) => {
	let sql = 'select * from blogs where 1=1 ' // 1=1 防止后面两项为空 出现的语法错误
	if (author) {
		sql += `and author like '%${author}%' `
	}
	if (keyword) {
		sql += `and title like '%${keyword}%' `
	}
	sql += 'order by createtime desc;'
	// 返回promise
	return await exec(sql)
}

const getDetail = async (id) => {
	const sql = `select * from blogs where id = '${id}'`
	const rows = await exec(sql)
	return rows[0]
}

const newBlog = async (blogData = {}) => {
	// blogData 是一个博客对象 包含title content 属性
	let { title, content, author } = blogData
	title = xss(title)
	const createtime = Date.now()
	const sql = `
		insert into blogs (title, content, author, createtime)
		values('${title}', '${content}','${author}',${createtime})
	`
	const insertData = await exec(sql)
	return {
		id: insertData.insertId
	}
}

const updateBlog = async (id, blogData = {}) => {
	const { title, content } = blogData
	const sql = `
		update blogs set title = '${title}', content = '${content}' where id = '${id}'
	`
	const updateData = await exec(sql)
	if (updateData.affectedRows > 0) {
		return true
	}
	return false
}

const deleteBlog = async (id, author) => {
	const sql = `delete from blogs where id = '${id}' and author = '${author}'`
	const deleteData = await exec(sql)
	if (deleteData.affectedRows > 0) {
		return true
	}
	return false
}


module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	deleteBlog,
}