
const express = require('express') // 要求路由器
const router = express.Router() // 引入路由器的模組
const home = require('./modules/home')// 引入home.js 的 code
const restaurants = require('./modules/restaurants')// 引入 restaurants.js 的 code
const search = require('./modules/search')// 引入 search.js 的 code
const users = require('./modules/users') // 引入user.js的code
// 如果URL是/, 就使用home的code
router.use('/', home)

// 如果URL是/search, 就使用home的code
// url: localhost3000/search
router.use('/search', search)

// 如果URL是/restaurants, 就使用restaurants的code
// url: localhost3000/restaurants
router.use('/restaurants', restaurants)

// 如果URL是/user, 就使用user的code
// url: localhost3000/user
router.use('/users', users)


// 匯出路由器
module.exports = router