const redis = require('redis')
const chalk = require('chalk')

const client = redis.createClient(6379,'localhost',{ auth_pass:'zhou94' })


client.on('connect', () => {
  console.log(
    chalk.green('redis已连接')
  );
})
client.on('error', (err) => {
  console.error(
    chalk.red('redis连接发生错误: ' + err)
  );
})

const redisGet = (key) => {
  return new Promise((resolve,reject) => {
    client.get(key,(err,result) => {
      if(err){
        reject(err)
      }
      resolve(result)
    })
  })
}

const redisSet = (key,val) => {
  return new Promise((resolve,reject) => {
    client.set(key,val,(err,result) => {
      if(err){
        reject(err)
      }
      resolve('redis已存储')
    })
  })
}
module.exports = { redisGet, redisSet };