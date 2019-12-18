## Node.js 相关内容的学习

### 1. base_API
 基本node.js API使用示例  
> - 文件名即对应相应node的操作

### 2. static_Service
实现在浏览器中查看文件
1.  发布一个npm的安装包  
> - 主文件： app.js  
> - pagckage.json中配置bin  
> `  "bin": {  
    "any-document": "bin/any-document"
  },`

2.  使用方法  
安装： 
`
npm install any-document
`  
使用：
> any-document # 把当前文件夹作为静态资源服务器根目录  
any-document -p 8080 # 设置端口号为8080  
any-document -h localhost # 设置host为localhost  
any-document -d /user # 设置根目录为user

### 3. glup_project: glup打包
1. package.json中配置  (将srs/scripts中的index.js文件通过babel编译打包到assets/scripts 文件中)
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "babel": "babel src/scripts -d assets/scripts"
  },
```
2. glup的配置: gulpfile.js
### 4. code_demo 
> 利用node开发一个简单的博客系统<包括登陆>  
1. blog_test: 不使用框架构建服务   
    * app.js 为主入口, 运行命令: `npm run dev`  
2. blog-express: 使用express框架构建服务  
    * app.js 为主入口, 运行命令: `npm run dev`    
    > express 中间件原理: lib/express-test  
3. blog-koa : 使用koa2 框架构建服务  
    * app.js 为主入口, 运行命令: `npm run dev`    
    > koa2 中间件原理: lib/koa2   
4. pm2-test: pm2 测试  
    * app.js 为主入口, 运行命令: `npm run prd`    
5. html-test 
    * umi 构建前端博客登陆、列表及详情页面。  
 运行命令: `npm run start`    

  
    
