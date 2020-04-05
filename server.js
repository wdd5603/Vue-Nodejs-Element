const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routerUser = require('./router/api/user')

const app = express()
const port = process.env.PORT || 5000
mongoose.connect('mongodb://localhost/test')
  .then(() => {
    console.log('mongodb connected');
  })
  .catch(err => {
    console.log(err);
  })
// 解析 application/json
app.use(bodyParser.json())
// 解析 application/x-www-form-urlencoded
// extended: false：表示使用系统模块querystring来处理，也是官方推荐的
// extended: true：表示使用第三方模块qs来处理
// 从功能性来讲，qs比querystring要更强大，所以这里可以根据项目的实际需求来考虑
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/user', routerUser)
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
})