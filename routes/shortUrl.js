const koaRouter = require('koa-router')
const router = new koaRouter({})
const controller =require('../controllers/shortUrl')

router.post('/generate.json',controller.generate)

module.exports = router