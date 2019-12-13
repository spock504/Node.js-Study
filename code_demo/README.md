## 1. blog_test: 不使用框架构建服务
> app.js 为主入口 
  - ___src 文件___： 
    1. src/router: 路由控制  
    2. src/model ： 成功/失败的返回模版  
    3. src/controller: 跟数据库连接的操作
    4. src/utils:  工具库  
      copy.sh:  
      * 设置定时任务，格式： *****command  
      * 将access.log 拷贝并重命名为2019-11-30.access.log  
      * 清空access.log文件，继续积累日志
      cryp.js: 通过crypto对密码进行加密处理

  - ___bin/www.js :___ createServer的逻辑 和业务代码无关
  - ___conf/db.js :___ 根据环境参数(process.env.NODE_ENV), 配置数据库和redis
  - ___logs:___ 日志文件
  > 安全
* 预防sql 注入： mysql.escape() 函数
* xss攻击： 攻击：（```<script>alert(alert(document.cookie))</script>```）  
	预防: npm install xss  
* 密码加密： crypto 
> 为何session适合redis:
* session访问频繁，对性能要求极高
* session可不考虑断电丢失数据的问题（内存的硬伤）
* session的数据量不会太大

## 2. blog-express: 使用express框架构建服务
> app.js 为主入口
 - ___middleware/loginCheck.js :___ 登陆校验中间件
 - ___lib/express-test___:  express 中间件原理
 - ___日志：___ 使用morgan
## 3. blog-koa : 使用koa2 框架构建服务
> app.js 为主入口
 - ___middleware/loginCheck.js :___ 登陆校验中间件
 - ___lib/koa2___:  koa2 中间件原理  
 - ___日志：___ 使用koa-morgan
## 4. pm2-test: pm2 测试
> 运行： npm run prd
- 查看pm2列表 ：pm2 list. (可以查看重启次数，查看自动重启次数)  
- 查看pm2信息： pm2 info app
- 停止： pm2 stop app
- 重启 pm2 restart app
- 查看日志 pm2 log
- 配置pm2: pm2.conf.json  

___为何使用多进程：___ 单进程内存受限; 充分利用多核CPU。
