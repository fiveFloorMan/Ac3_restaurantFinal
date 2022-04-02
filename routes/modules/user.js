// 這裡是使用者登入頁
// 這裡的 url:http://localhost3000/user/XXX

const express = require('express')
const router = express.Router()

// url = http://localhost3000/user/login
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router