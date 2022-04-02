
const express = require('express') // 要求路由器
const router = express.Router() // 引入路由器的模組
const home = require('./modules/home')// 引入home.js 的 code
const restaurants = require('./modules/restaurants')// 引入 restaurants.js 的 code
const search = require('./modules/search')// 引入 search.js 的 code
const users = require('./modules/users') // 引入user.js的code
const { authenticator } = require('../middleware/auth') // 掛載 middleware

// url: localhost3000/user
router.use('/users', users)

// url: localhost3000/search
router.use('/search',authenticator, search)

// url: localhost3000/restaurants
router.use('/restaurants',authenticator, restaurants)

// url: localhost3000/
router.use('/',authenticator, home)

// 匯出路由器
module.exports = router