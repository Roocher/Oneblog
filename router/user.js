const express = require('express')
const router = express.Router()
const moment = require('moment')
const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'my_one'
})

//用户请求注册页面
router.get('/register', (req, res) => {
    res.render('./user/register.ejs', {})
})

//用户请求登录页面
router.get('/login', (req, res) => {
    res.render('./user/login', {})
})

//注册新用户
router.post('/register', (req, res) => {

    const body = req.body

    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({ msg: '请将表单填写完整', status: 501 })
    }

    const sql1 = 'select count(*) as count from blog_users where username=?'
    conn.query(sql1, body.username, (err, result) => {
        //查询失败则告知客户端失败
        if (err) return res.send({ msg: '用户名查重失败', status: 502 })

        if (result[0].count !== 0) return res.send({ msg: '更换其他用户名', status: 503 })

        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql2 = 'insert into blog_users set ?'
        conn.query(sql2, body, (err, result) => {
            if (err) return res.send({ msg: '注册新用户失败!', status: 504 })
            if (result.affectedRows !== 1) return res.send({ msg: '注册新用户失败!', status: 505 })
            res.send({ msg: '注册成功', status: 200 })
        })
    })

})

//监听登录的请求
router.post('/login', (req, res) => {
    //获取到表单中数据
    const body = req.body

    //执行sql语句查询用户是否存在
    const sql1 = 'select * from blog_users where username=? and password=?'

    conn.query(sql1, [body.username, body.password], (err, result) => {
        // 如果查询执行sql语句失败则登陆失败
        if (err) return res.send({ msg: '用户登录失败', static: 501 })

        //如果查询结果条数不唯一则查询失败
        if (result.length !== 1) return res.send({ msg: '用户登录失败', static: 502 })
        res.send({ msg: 'ok', status: 200 })
    })
})

// 将路由对象暴露出去
module.exports = router