const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy //官方要求寫法
const User = require('../models/user') //User 資料庫綱要
const bcrypt = require('bcryptjs')
// 匯出function
module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定local的login策略
  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    User.findOne({ email:email })
      .then(user => {
        if (!user) {
          return done(null, false, {message: '這個Email還沒註冊'})
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch){
            return done(null, false, {message: '帳號或是密碼輸入錯誤'})
          }
          return done(null, user)
        })
      })
      .catch(error => done(error, false))
  }))
  // 設定序列化 & 反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}