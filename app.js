const express = require('express')
const app = express()

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')

// 设置模板页面的存放路径
app.set('views', './views')

// 将node_modules文件夹托管为静态资源目录
app.use('/node_modules', express.static('./node_modules'))


app.get('/', (req, res) => {
    res.render('index', {})
})

//用户请求注册页面
app.get('/register', (req, res) => {
    res.render('./user/register', {})
})

//用户请求登录页面
app.get('/login', (req, res) => {
    res.render('./user/login', {})
})

//注册新用户
app.post('/register', (req, res) => {
    res.send({ status: '200', msg: 'ok' })
})

app.listen(3000, () => {
    console.log("服务器运行成功…… http://127.0.0.1:3000")
})