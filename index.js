const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const response = require('./middleware/response');
const logger = require('./middleware/log4');
const routes =require('./routes/index'); 
require('./database/db');
require('./database/redis');

// error handler
onerror(app)
// middlewares
app.use(bodyParser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

//返回中间件
app.use(response);
//日志
app.use(logger);
//路由
app.use(routes.routes(), routes.allowedMethods())

module.exports = app
