// 要求路由器
const express = require('express')
// 引入路由器的模組
const router = express.Router() 
// 引入home.js 的 code
const home = require('./modules/home')
// 引入 restaurants.js 的 code
const restaurants = require('./modules/restaurants')
// 引入 search.js 的 code
const search = require('./modules/search')

// 如果URL是/, 就使用home的code
router.use('/', home)
// 如果URL是/search, 就使用home的code
router.use('/search', search)
// url: localhost3000/search

// 如果URL是/restaurants, 就使用restaurants的code
router.use('/restaurants', restaurants)
// url: localhost3000/restaurants



// 匯出路由器
module.exports = router