const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')

const usePassport = require('./config/passport')

require('./config/mongoose')
const app = express()
const port = 3000

// require 渲染的工具
const exphbs = require('express-handlebars')

// set engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// session(使用者登入憑證)
app.use(session({
  secret: 'RestaurantsUserSecret',
  resave: false, 
  saveUninitialized: true
}))
// Ps: resave & saveUninitialized 沒微調也能正常使用

// 告知靜態檔案位置
app.use(express.static('public'))

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// 告知使用method-override
app.use(methodOverride('_method'))

// 會員登入系統
usePassport(app)

// 會員是否登入 (所有的views都可以存取res.locals)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// 使用./models/routes
app.use(routes)

// 監聽器
app.listen(port, () => {
  console.log(`DNS : http://localhost:${port}`)
})
