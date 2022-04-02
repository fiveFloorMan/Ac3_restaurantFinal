// 這裡是使用者登入頁&註冊頁
// 這裡的 url:http://localhost3000/user/XXX

const express = require('express')
const router = express.Router()

// url = http://localhost3000/user/login
router.get('/login', (req, res) => {
  res.render('login')
})

// url = http://localhost3000/user/login
// 接住login(btn)回傳的userLoginData
router.post('/login', (req, res) => {
  
})

// url = http://localhost3000/user/register
// 註冊頁
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router