const koaRouter = require('koa-router')
const shortUrl = require('./shortUrl')
const router = new koaRouter({
  prefix:'/api'
})
router.use('/shortUrl',shortUrl.routes(),shortUrl.allowedMethods())
module.exports = router

