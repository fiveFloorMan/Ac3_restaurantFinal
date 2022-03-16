const express = require('express')

const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')

require('./config/mongoose')
const app = express()
const port = 3000

// require 渲染的工具
const exphbs = require('express-handlebars')

// set engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 告知靜態檔案位置
app.use(express.static('public'))

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// 告知使用method-override
app.use(methodOverride('_method'))

// 使用./models/routes
app.use(routes)

// 監聽器
app.listen(port, () => {
  console.log(`DNS : http://localhost:${port}`)
})
