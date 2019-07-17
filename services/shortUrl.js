const IdsModel = require('../models/ids')
const UrlsModel = require('../models/urls')
const { redisGet, redisSet } = require('../database/redis')
class shortUrlService {
  async getShortUrl (shortUrl) {
    try{
      const url = await redisGet(shortUrl) // 先从redis中查
      if(url) return url
      const monRes = await UrlsModel.findOne({shortUrl})
      if(monRes){
        return monRes.longUrl
      }
      return null
    }catch(err){
      console.log(err)
    }
  }
  async generateUrl(url) {
    let str = '';
    try{
    const urlRes = await UrlsModel.findOne({longUrl:url})  //查询数据库中是否已存在
    if(urlRes){
      return urlRes.shortUrl
    }
    const arr = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ];

    for (let i = 0; i < 6; i++) {
      const pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    const strs = await UrlsModel.findOne({shortUrl:str}) // 如果存在相同短链且url不同则重新生成
    if(strs){
      return this.generateUrl() // 如果存在则重新生成
    }
    await this.storeInData(url,str)
    }catch(err){
      console.log(err)
    }
    
    return str;
  }

  async storeInData(longUrl,shortUrl){
    try{ // 同步存入mongo和redis
      const idData = await IdsModel.findOne();
      idData['short_urls_id']++
      await idData.save();
      const urlsObj = {
        longUrl,
        shortUrl,
        id:idData['short_urls_id']
      }
      const newUrlsModel = new UrlsModel(urlsObj)
      newUrlsModel.save()
      await redisSet(shortUrl,longUrl)
    }catch(err){
      console.log(err)
    }
  }
}

module.exports = new shortUrlService()