# kugou-music
![Alt text](./GIF.gif)
> thinkjs+vue 

## Build Setup

``` bash
# 数据是从网页抓取，安装爬虫工具
cd kugou-spider
npm install

# Start server
npm start

# Deploy with pm2  Use pm2 to deploy app on production enviroment.
pm2 startOrReload pm2.json

# install dependencies
cd ..
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build




