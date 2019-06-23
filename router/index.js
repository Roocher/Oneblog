const express = require('express')
const router = express.Router()


// 用户请求项目首页
router.get('/', (req, res) => {
    res.render('index', {})
})

// 将路由对象暴露出去
module.exports = router