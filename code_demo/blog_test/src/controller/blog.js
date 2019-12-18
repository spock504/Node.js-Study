const {exec} = require('../../db/mysql')
const xss = require('xss')

const getList = (author, keyword) => {
	let sql = 'select * from blogs where 1=1 ' // 1=1 防止后面两项为空 出现的语法错误
	if (author) {
		sql += `and author like '%${author}%' `
	}
	if (keyword) {
		sql += `and title like '%${keyword}%' `
	}
	sql += 'order by createtime desc;'
	// 返回promise
  	return exec(sql)
}

const getDetail = (id) => {
	const sql = `select * from blogs where id = '${id}'`
	return exec(sql).then(rows => {
		return rows[0]
	})
}

const newBlog = (blogData = {}) => {
	// blogData 是一个博客对象 包含title content 属性
	let {title, content, author} = blogData
	title = xss(title)
	const createtime = Date.now()
	const sql = `
		insert into blogs (title, content, author, createtime)
		values('${title}', '${content}','${author}',${createtime})
	`
	return exec(sql).then(insertData => {
		console.log("insertData is= ", insertData)
		return {
			id : insertData.insertId
		}
	})
}

const updateBlog = (blogData = {}) => {
	const {title, content, id} = blogData
	const sql = `
		update blogs set title = '${title}', content = '${content}' where id = '${id}'
	`
	return exec(sql).then(updateData => {
		console.log("updateData is= ", updateData)
		if (updateData.affectedRows > 0) {
			return true
		}
		return false
	})
}

const deleteBlog = (id, author) => {
	const sql = `
		delete from blogs where id = '${id}' and author = '${author}'
	`
	return exec(sql).then(deleteData => {
		console.log("deleteData is= ", deleteData)
		if (deleteData.affectedRows > 0) {
			return true
		}
		return false
	})
}


module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	deleteBlog,
}