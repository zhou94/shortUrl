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