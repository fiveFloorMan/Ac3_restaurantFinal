// 這裡是使用者登入頁&註冊頁
// 這裡的 url:http://localhost3000/user/XXX

const express = require('express')
const router = express.Router()
const User = require('../../models/user') // users 資料庫綱要
const passport = require('passport')

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
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    }
  })
  .catch(error => console.log(error))
})
module.exports = router