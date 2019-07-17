# shortUrl

一个短网址服务

> [在线地址](https://zhou1994.cn)

## 如何安装与使用

> shortUrl

git clone https://github.com/zhou94/shortUrl.git

cd shortUrl

yarn //安装依赖

yarn dev //服务端运行 nodemon调试

yarn prod  //生产环境 pm2进程守护

## 技术栈

- koa2
- mongodb
- redis 主要做缓存短链映射 减少mongo操作
