const IdsModel = require('../models/ids');

exports.generate = async ctx =>{
    try{
        const { url } = ctx.request.body;
        if(!url){
          ctx.state.error('参数不正确');
        } else {
         
        }
    }catch(err){
        ctx.state.error(err);
    }
}
