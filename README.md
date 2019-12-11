# Node.js-Study

## 1. base_API
> 基本node.js API使用示例

## 2. static_Service: cli 工具 
```
npm install any-document
```

## 使用方法
```$xslt
any-document # 把当前文件夹作为静态资源服务器根目录
any-document -p 8080 # 设置端口号为8080
any-document -h localhost # 设置host为localhost
any-document -d /user # 设置根目录为user
```

## 3. glup_project: glup打包
```
gulp # 执行打包命令，将css和js文件分别打包到对应的目录
```

## 4. code_demo 
```$xslt
    开发web server 博客服务
    blog_test: 创建博客
    html_test: 前后端链接
    redis_test: redis 初试
    blog-express: 使用express框架构建服务
        >  express 中间件原理: （express-test.js）
        >  测试： 运行： node express-test/test.js
                操作： 打开浏览器 http://localhost:8233/api/get-cookie 
                结果： 查看控制台  （很好）
    
```
