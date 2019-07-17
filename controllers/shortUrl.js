const shortUrlService = require('../services/shortUrl')
const config = require('../config/index')
exports.generate = async ctx =>{
    try{
        const { url } = ctx.request.body;
        console.log(process.env.NODE_ENV)
        const prefix = config.prefix[process.env.NODE_ENV]
        const reg = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
        if(!url){
          ctx.state.error('参数不正确');
        } else {
          const regResult = reg.test(url)
         if(regResult){
          const short_url = await shortUrlService.generateUrl(url)

          ctx.state.success({
            short_url: prefix + short_url
          },'生成成功')
         }else{
          ctx.state.error('参数格式不正确');
         }
        }
    }catch(err){
        ctx.state.error(err);
    }
}
exports.redirect = async ctx => {
  try{
    const shortLink =  ctx.params.shortLink
    const url = await shortUrlService.getShortUrl(shortLink)
    if(url) return ctx.redirect(url)
    ctx.status = 404;
  }catch(err){
    ctx.status = 404;
  }
}