const express = require('express')
const mongoose = require('mongoose')
const RestaurantModel = require('./models/restaurant-list')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoose error')
})

db.once('open', () => {
  console.log('mongoose connedted!')
})

// require 渲染的工具
const exphbs = require('express-handlebars')
// 可能是無用的變數
const restaurantsList = require('./restaurant.json')

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
