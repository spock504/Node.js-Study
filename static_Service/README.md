### __实现在浏览器中查看文件及文件的详情，并打包成一个npm包__
运行命令： ```node src/app.js ```
### ___Description___
1. config/defaultConfig.js 
    > 默认配置(hostname, port, 缓存的参数)
2. app.js 
    通过yargs处理命令行的参数
    >  加上执行权限： chmod +x static_Service/bin/any-document  
 查看： ls -al static_Service/bin/any-document  
调用： static_Service/bin/any-document -p 9999

3. index.js
    > 构建服务实例。
4. helper 辅助文件
    > router.js :  处理路由, 通过判断是文件夹返回目录，是文件返回内容。  
    - 文件： ```rs = fs.createReadStream(filePath);    rs.pipe(res); //  把文件的内容返回```
    - 文件夹： ```res.end(template(data));```
    >  mime.js : 处理不同文件后缀所对应的Content-Type类型  
      catch.js : 根据配置处理缓存的不同类型  
      compress.js : 处理压缩文件  
      template.js: 模版文件
### ___publish___

操作： 
```
 加上执行权限： chmod +x static_Service/bin/any-document  
 查看： ls -al static_Service/bin/any-document
 调用： static_Service/bin/any-document -p 9999
```
发布：
```
 pagckage.json中配置bin
 登陆npm: npm login
 发布npm: npm publish
```
使用：
```
npm install any-document
```

```
any-document # 把当前文件夹作为静态资源服务器根目录
any-document -p 8080 # 设置端口号为8080
any-document -h localhost # 设置host为localhost
any-document -d /user # 设置根目录为user
```
