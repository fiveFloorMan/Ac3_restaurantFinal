// 這裡是使用者登入頁&註冊頁
// 這裡的 url:http://localhost3000/user/XXX

const express = require('express')
const router = express.Router()
const User = require('../../models/user') // users 資料庫綱要
const passport = require('passport')
const bcrypt = require('bcryptjs')

// url = http://localhost3000/users/login
router.get('/login', (req, res) => {
  res.render('login')
})

// url = http://localhost3000/users/login
// 接住login(btn)回傳的userLoginData
router.post('/login', passport.authenticate('local', {
  successRedirect:'/',
  failureRedirect:'/users/login'
})) 

// url = http://localhost3000/users/register
// 註冊頁送出資料
router.get('/register', (req, res) => {
  res.render('register')
})

// url = http://localhost3000/users/register
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '除了姓名, 其他欄位都是必填的喔'})
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符'})
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email: email}).then(user =>{
    if (user){
      console.log('這是已經註冊過的帳號')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
        name,
        email,
        password: hash
      }))
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    }
  })
  .catch(error => console.log(error))
})

// url = http://localhost3000/users/logout
// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出了')
  res.redirect('/users/login')
})

module.exports = router