const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')

// 设置模板页面的存放路径
app.set('views', './views')

//注册表单数据的中间键
app.use(bodyParser.urlencoded({ extended: false }))

// 将node_modules文件夹托管为静态资源目录
app.use('/node_modules', express.static('./node_modules'))

//导入index路由模块
const router1 = require('./router/index')
app.use(router1)

//导入user路由模块
const router2 = require('./router/user')
app.use(router2)

app.listen(3000, () => {
    console.log("服务器运行成功…… http://127.0.0.1:3000")
})