const koaRouter = require('koa-router')
const shortUrl = require('./shortUrl')
const controller =require('../controllers/shortUrl')
const router = new koaRouter()
router.use('/shortUrl',shortUrl.routes(),shortUrl.allowedMethods())
router.get('/s/:shortLink', controller.redirect);
module.exports = router

