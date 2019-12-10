var createError = require('http-errors');
var express = require('express');
const fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogsRouter = require('./routes/blogs')
const userRouter = require('./routes/user')

var app = express();

// view engine setup  视图文件
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  app.use(logger('dev'));
} else {
  //  线上环境输出日志
  const fileName = path.join(__dirname, 'logs','access.log')
  const writeStream = fs.createWriteStream(fileName,{
    flags: 'a',
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 静态文件
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'Liujian._4339#.',
  cookie: {
    path: '/', // 默认配置
    httpOnly: true, // 默认配置
    maxAge: 60 * 60 * 24 * 1000,
  }
}))
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogsRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
